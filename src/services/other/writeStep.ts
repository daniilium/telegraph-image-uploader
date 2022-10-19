import chalk from "chalk";

export function writeStep(text: string) {
  console.log(chalk.bgGreenBright("STEP ") + chalk.inverse(text + ":"));
}
