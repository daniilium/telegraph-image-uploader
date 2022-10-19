import chalk from "chalk";

export function writeError(text: string) {
  console.log(chalk.bgRedBright("ERROR: ") + chalk.inverse(text));
}
