import inquirer from "inquirer";
import { globalState, writeStep } from "../services/index.js";
import { createPage } from "./index.js";

export async function setNamePage() {
  writeStep("Set name page");

  const folderPath = globalState.folderPath;

  const answers = await inquirer.prompt({
    type: "input",
    name: "pageName",
    message: "Set the name of the future page:",
  });

  const { pageName } = answers;
  if (pageName) {
    globalState.pageName = pageName;
    createPage();
  } else setNamePage();
}
