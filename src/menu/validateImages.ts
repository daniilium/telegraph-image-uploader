import inquirer from "inquirer";
import { writeStep } from "../services/index.js";
import { selectFolder } from "./index.js";

export async function validateImages(images: string[]) {
  writeStep("Validate images");

  const answers = await inquirer.prompt({
    type: "list",
    loop: false,
    name: "tryAgain",
    message: "ERROR: These files are larger than the allowable size of 4.5MB:",
    choices: [
      ...images.map((file: string, index) => `${index + 1}. ${file}`),
      "[ <- Back ]",
    ],
  });

  if (answers.tryAgain === "[ <- Back ]") selectFolder();
  else validateImages(images);
}
