import os from "os";
import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";

import { ls, isFolder, globalState, writeStep } from "../services/index.js";
import { main } from "./index.js";

inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

export async function setWorkFolder() {
  writeStep("Set work folder");

  const answers = await inquirer.prompt([
    {
      type: "file-tree-selection",
      name: "folder",
      root: globalState.workDir || os.homedir(),
      message:
        "Selecting a folder or an archive  to download, will start from here:",
      enableGoUpperDirectory: true,
    },
  ]);
  const { folder } = answers;

  if (!isFolder(folder)) {
    console.log("ERROR: You need to select a folder");
    return setWorkFolder();
  }

  let filesInFolder;
  try {
    filesInFolder = await ls(folder);
  } catch (e) {
    const message = e.message as string;

    if (message.startsWith("EPERM: operation not permitted")) {
      console.log("ERROR: Operation not permitted");
    }
    setWorkFolder();
  }

  globalState.workDir = folder;
  console.log(`New default work folder: ${folder}`);
  main();
}
