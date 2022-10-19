import inquirer from "inquirer";
import { globalState, writeTitle } from "../services/index.js";

import { main, setToken, setWorkFolder } from "./index.js";

export async function setConfig() {
  writeTitle("Config menu");

  const answers = await inquirer.prompt({
    type: "list",
    name: "direction",
    message: "What to do?",
    choices: ["Set token", "Set work folder", "Reset all", "[ <- Back ]"],
  });

  const { direction } = answers;

  if ("Set token" === direction) setToken();
  if ("Set work folder" === direction) setWorkFolder();
  if ("Reset all" === direction) {
    globalState.resetAll();
    main();
  }
  if ("[ <- Back ]" === direction) main();
}
