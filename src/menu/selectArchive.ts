import os from "os";
import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";
import conf from "conf";

import {
  filterImages,
  isFolder,
  ls,
  sizeValidation,
  sortImages,
  unzip,
} from "../services/index.js";
import { TEMP_DIR } from "../services/constants.js";
import { main, validateImages, validateOrder } from "./index.js";
inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);
const config = new conf();

export async function selectArchive() {
  const answers = await inquirer.prompt([
    {
      type: "file-tree-selection",
      name: "archive",
      root: config.get("workFolder") || os.homedir(),
      message: "Choose a folder to load",
      enableGoUpperDirectory: true,
    },
  ]);
  const { archive } = answers;

  if (isFolder(archive)) {
    console.log("ERROR: You select a folder");
    return selectArchive();
  }

  try {
    await unzip(archive);
  } catch (e) {
    console.log("ERROR:", e.message);
    console.log("try again");

    main();
  }

  const filesInFolder = await ls(TEMP_DIR);
  const images = filterImages(filesInFolder);
  const sort = sortImages(images);
  const bigFiles = await sizeValidation(sort, TEMP_DIR);

  if (bigFiles.length !== 0) validateImages(bigFiles);
  else if (sort.length === 0) {
    console.log("ERROR: There are no matching images in the folder");
    return selectArchive();
  } else validateOrder(sort, TEMP_DIR);
}
