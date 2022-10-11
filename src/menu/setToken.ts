import conf from "conf";
import inquirer from "inquirer";

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
        return (
          config.get("token") ||
          "d3b25feccb89e508a9114afb82aa421fe2a9712b963b387cc5ad71e58722"
        );
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
