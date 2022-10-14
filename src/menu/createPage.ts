import inquirer from "inquirer";
import conf from "conf";
import { createSpinner } from "nanospinner";

import {
  createImageTags,
  createPage as createPageFetch,
  uploadImages,
} from "../services/index.js";
import { ErrorMessage } from "../services/types.js";

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
      let token =
        (config.get("token") as undefined | string) ||
        "d3b25feccb89e508a9114afb82aa421fe2a9712b963b387cc5ad71e58722";

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
