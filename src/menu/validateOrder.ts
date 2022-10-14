import inquirer from "inquirer";
import { main, setNamePage } from "./index.js";

export async function validateOrder(images: string[], folder: string) {
  const answers = await inquirer.prompt({
    type: "list",
    loop: true,
    name: "choose",
    message: "The images on the future page will go in this order:",
    choices: [
      "[ ✓ Confirmed ]",
      ...images.map((file: string, index) => `${index + 1}. ${file}`),
      "[ <- Back to main menu ]",
      new inquirer.Separator(),
    ],
  });
  const { choose } = answers;

  if ("[ <- Back to main menu ]" === choose) main();
  else if (answers.choose === "[ ✓ Confirmed ]") setNamePage(images, folder);
  else validateOrder(images, folder);
}
