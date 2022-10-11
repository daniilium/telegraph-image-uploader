import inquirer from "inquirer";
import { selectFolder } from "./index.js";

export async function validateImages(files: string[]) {
  const answers = await inquirer.prompt({
    type: "list",
    loop: false,
    name: "tryAgain",
    message: "ERROR: These files are larger than the allowable size of 4.5MB:",
    choices: [
      ...files.map((file: string, index) => `${index + 1}. ${file}`),
      "[ <- Back ]",
    ],
  });

  if (answers.tryAgain === "[ <- Back ]") selectFolder();
  else validateImages(files);
}
