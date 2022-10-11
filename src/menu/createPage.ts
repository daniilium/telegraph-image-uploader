import inquirer from "inquirer";
import conf from "conf";
import { createSpinner } from "nanospinner";

import {
  createImageTags,
  createPage as createPageFetch,
  uploadImages,
} from "../services/index.js";
import { ErrorMessage } from "../services/types.js";
import { DEFAULT_TOKEN } from "../services/constants.js";

const config = new conf();

export async function createPage(
  images: string[],
  folder: string,
  pageName: string
) {
  const answers = await inquirer.prompt({
    type: "confirm",
    name: "isCreate",
    message: `Create a page named "${pageName}" with a content of ${images.length} images?`,
    default: false,
  });

  const { isCreate } = answers;

  if (isCreate) {
    return (async function upload() {
      const spinner = createSpinner(
        "Now the images are being uploaded and the page is being created..."
      ).start();

      const uploadedImages = await uploadImages(images, folder);
      const content = createImageTags(uploadedImages);
      let token = (config.get("token") as undefined | string) || DEFAULT_TOKEN;

      const page = await createPageFetch(pageName, content, token);

      if (page.ok) {
        spinner.success({
          text: `🤩 Good result: ${page.result.url}`,
        });
      } else if (!page.ok) {
        spinner.error({ text: `💀 ERROR ${(page as ErrorMessage).error}` });
        process.exit(1);
      }
    })();
  }
}
