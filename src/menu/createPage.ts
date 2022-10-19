import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

import {
  createImageTags,
  createPage as createPageFetch,
  getAccount,
  globalState,
  uploadImages,
  writeError,
  writeStep,
  writeTitle,
} from "../services/index.js";
import { ErrorMessage } from "../services/types.js";
import { main } from "./index.js";

export async function createPage() {
  writeStep("Create page");

  const { images, folderPath, pageName, token } = globalState;

  const account = await getAccount(globalState.token);
  if (!account.ok) {
    writeError("Get account problem");
    return main();
  }

  const answers = await inquirer.prompt({
    type: "confirm",
    name: "isCreate",
    message: `Create a page named "${pageName}" with a content of ${images.length} images? Use account ${account.result.author_name}`,
    default: true,
  });

  const { isCreate } = answers;

  if (isCreate) {
    const spinner = createSpinner("Images are now being uploaded...").start();

    const uploadedImages = await uploadImages(images, folderPath);
    const content = createImageTags(uploadedImages);
    const page = await createPageFetch(pageName, content, token);

    if (page.ok) {
      spinner.success({
        text: `🤩 Good result: ${page.result.url}`,
      });
      main();
    } else if (!page.ok) {
      spinner.error({ text: `💀 ERROR ${(page as ErrorMessage).error}` });
      process.exit(1);
    }
  } else return main();
}
