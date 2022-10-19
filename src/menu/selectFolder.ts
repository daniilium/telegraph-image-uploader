import os from "os";
import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";

import {
  filterImages,
  ls,
  isFolder,
  sizeValidation,
  sortImages,
  globalState,
  writeError,
  writeStep,
} from "../services/index.js";
import { main, validateImages, validateOrder } from "./index.js";
inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

export async function selectFolder() {
  writeStep("Select folder");

  const answers = await inquirer.prompt([
    {
      type: "file-tree-selection",
      name: "folder",
      root: globalState.workDir || os.homedir(),
      message: "Choose a folder to load",
      enableGoUpperDirectory: true,
    },
  ]);

  const { folder } = answers;

  if (!isFolder(folder)) {
    writeError("You need to select a folder");
    return main();
  }

  let filesInFolder;
  try {
    filesInFolder = await ls(folder);
  } catch (e) {
    const message = e.message as string;

    if (message.startsWith("EPERM: operation not permitted")) {
      writeError("Operation not permitted");
    }
    return main();
  }

  const images = filterImages(filesInFolder);
  const sort = sortImages(images);
  const bigFiles = await sizeValidation(sort, folder);

  if (bigFiles.length !== 0) validateImages(bigFiles);
  else if (sort.length === 0) {
    writeError("There are no matching images in the folder");
    return main();
  } else {
    globalState.images = sort;
    globalState.folderPath = folder;
    validateOrder();
  }
}
