import os from "os";
import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";
import conf from "conf";

import {
  filterImages,
  ls,
  isFolder,
  sizeValidation,
  sortImages,
} from "../services/index.js";
import { validateImages, validateOrder } from "./index.js";
inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);
const config = new conf();

export async function selectFolder() {
  // TODO: убрать /downloads из root
  const answers = await inquirer.prompt([
    {
      type: "file-tree-selection",
      name: "folder",
      root: config.get("workFolder") || os.homedir(),
      message: "Choose a folder to load",
      enableGoUpperDirectory: true,
    },
  ]);
  const { folder } = answers;

  if (!isFolder(folder)) {
    console.log("ERROR: You need to select a folder");
    return selectFolder();
  }

  let filesInFolder;
  try {
    filesInFolder = await ls(folder);
  } catch (e) {
    const message = e.message as string;

    if (message.startsWith("EPERM: operation not permitted")) {
      console.log("ERROR: Operation not permitted");
    }
    selectFolder();
  }

  const images = filterImages(filesInFolder);
  const sort = sortImages(images);
  const bigFiles = await sizeValidation(sort, folder);

  if (bigFiles.length !== 0) validateImages(bigFiles);
  else if (sort.length === 0) {
    console.log("ERROR: There are no matching images in the folder");
    return selectFolder();
  } else validateOrder(sort, folder);
}
