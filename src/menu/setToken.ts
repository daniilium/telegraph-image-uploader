import conf from "conf";
import inquirer from "inquirer";

import { DEFAULT_TOKEN } from "../services/constants.js";
import { getAccount } from "../services/index.js";
import { main } from "./index.js";

const config = new conf();
// TODO убрать очистку конфига
config.clear();
const ui = new inquirer.ui.BottomBar();

export function setToken() {
  console.log("Config menu:");

  inquirer
    .prompt({
      type: "input",
      name: "token",
      message: "What's your token",
      default() {
        return config.get("token") || DEFAULT_TOKEN;
      },
      async validate(token: string) {
        const result = await getAccount(token);
        if (result.ok) return true;
        else return "This token is incorrect, try another";
      },
    })
    .then((answers: any) => {
      config.set("token", answers.token);
      ui.log.write("The token was validated and saved.");

      main();
    });
}
