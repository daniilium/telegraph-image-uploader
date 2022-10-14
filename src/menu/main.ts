import inquirer from "inquirer";
import { selectFolder, setConfig } from "./index.js";

export async function main() {
  console.log("Main menu:");
  const answers = await inquirer.prompt({
    type: "list",
    name: "direction",
    message: "What to do?",
    choices: ["Load archive", "Load folder", "Set config", "Exit"],
  });

  const { direction } = answers;

  if ("Load folder" === direction) selectFolder();
  if ("Set config" === direction) setConfig();
  if ("Exit" === direction) console.log("Goodbye!");
}
