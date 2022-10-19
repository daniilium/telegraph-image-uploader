import inquirer from "inquirer";
import { globalState, writeTitle } from "../services/index.js";
import { selectArchive, selectFolder, setConfig, setToken } from "./index.js";

export async function main() {
  writeTitle("Main menu");

  if (!globalState.token) {
    return setToken();
  }

  const answers = await inquirer.prompt({
    type: "list",
    name: "direction",
    message: "What to do?",
    choices: ["Load archive", "Load folder", "Set config", "Exit"],
  });

  const { direction } = answers;

  if ("Load archive" === direction) selectArchive();
  if ("Load folder" === direction) selectFolder();
  if ("Set config" === direction) setConfig();
  if ("Exit" === direction) {
    console.log("Goodbye!");
    process.exit(1);
  }
}
