import inquirer from "inquirer";

import { DEFAULT_TOKEN } from "../services/constants.js";
import { getAccount, globalState, writeStep } from "../services/index.js";
import { main } from "./index.js";

export async function setToken() {
  writeStep("Set token");

  console.log(
    "IMPORTANT: You need a token for the program to work, the author of created pages depends on it."
  );
  console.log("The token is like a login and password to your pages.");
  console.log(
    "By default you can use the public key, it is not secure. To do this, press ENTER."
  );
  console.log(
    "It is recommended to create your personal token through the service https://octograph.netlify.app/"
  );

  const answers = await inquirer.prompt({
    type: "input",
    name: "token",
    message: "What's your token",
    default() {
      return globalState.token || DEFAULT_TOKEN;
    },
    async validate(token: string) {
      const result = await getAccount(token);
      if (result.ok) return true;
      else return "This token is incorrect, try another";
    },
  });

  const { token } = answers;

  if (token) {
    const account = await getAccount(token);
    if (!account.ok) return;
    console.log(
      `You used a token with author_name as "${
        account.result.author_name || "EMPTY"
      }" and author_url as "${account.result.author_url || "EMPTY"}".`
    );

    console.log("The token was validated and saved.");
    globalState.token = answers.token;
    main();
  }
}
