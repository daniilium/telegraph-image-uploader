import chalk from "chalk";

export function writeTitle(text: string) {
  console.log("        ");
  console.log(chalk.bgBlueBright("PAGE ") + chalk.inverse(text + ":"));
}
