import inquirer from "inquirer";

import { main, setToken, setWorkFolder } from "./index.js";

export async function setConfig() {
  console.log("Config menu:");

  const answers = await inquirer.prompt({
    type: "list",
    name: "direction",
    message: "What to do?",
    choices: ["Set token", "Set work folder"],
  });

  const { direction } = answers;

  if ("Set token" === direction) setToken();
  if ("Set work folder" === direction) setWorkFolder();
  if ("[ <- Back ]" === direction) main();
}
