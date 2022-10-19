import os from "os";
import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";
import { createSpinner } from "nanospinner";

import {
  filterImages,
  globalState,
  isFolder,
  ls,
  sizeValidation,
  sortImages,
  unzip,
  writeError,
  writeStep,
} from "../services/index.js";
import { TEMP_DIR } from "../services/constants.js";
import { main, validateImages, validateOrder } from "./index.js";
inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

export async function selectArchive() {
  writeStep("Select archive");

  const answers = await inquirer.prompt([
    {
      type: "file-tree-selection",
      name: "archive",
      root: globalState.workDir || os.homedir(),
      message: "Choose a archive to load",
      enableGoUpperDirectory: true,
    },
  ]);
  const { archive } = answers;

  if (isFolder(archive)) {
    writeError("You select a folder");
    return main();
  }

  const spinner = createSpinner("The archive is unzipped...").start();
  try {
    await unzip(archive);
  } catch {
    spinner.error({
      text: `💀 ERROR The wrong file was selected for unzipping`,
    });
    writeError("The wrong file was selected for unzipping");
    return main();
  }
  spinner.success({ text: "👍 The archive unpacked successfully" });

  const filesInFolder = await ls(TEMP_DIR);
  const images = filterImages(filesInFolder);
  const sort = sortImages(images);

  const bigFiles = await sizeValidation(sort, TEMP_DIR);

  if (bigFiles.length !== 0) return validateImages(bigFiles);
  if (sort.length === 0) {
    writeError("There are no matching images in the folder");
    return main();
  }

  globalState.images = sort;
  globalState.folderPath = TEMP_DIR;
  validateOrder();
}
