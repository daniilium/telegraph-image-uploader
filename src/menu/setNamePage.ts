import inquirer from "inquirer";
import { createPage } from "./index.js";

export async function setNamePage(files: string[], folder: string) {
  const answers = await inquirer.prompt({
    type: "input",
    name: "pageName",
    message: "Set the name of the future page:",
    default() {
      return folder;
    },
  });

  const { pageName } = answers;
  if (pageName) createPage(files, folder, pageName);
  else setNamePage(files, folder);
}
