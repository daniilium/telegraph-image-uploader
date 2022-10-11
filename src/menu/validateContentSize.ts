import inquirer from "inquirer";
import { selectFolder } from "./index.js";

export async function validateContentSize(
  files: string[],
  folder: string,
  pageName: string
) {
  const getSizeAllImages = (images: string[]) => images.length * 50;
  const getSize = () =>
    [getSizeAllImages(files)].reduce((prev, curr) => prev + curr) / 1000;

  const answers = await inquirer.prompt({
    type: "list",
    loop: false,
    name: "tryAgain",
    message: "ERROR: Content to download over 64KB:",
    choices: [
      `The size of the content you upload is ${getSize()}KB out of a possible 64KB `,
      "[ <- Back ]",
    ],
  });

  if (answers.tryAgain === "[ <- Back ]") selectFolder();
}
