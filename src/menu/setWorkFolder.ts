import os from "os";
import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";
import conf from "conf";

const config = new conf();

import { ls, isFolder } from "../services/index.js";
import { main } from "./index.js";

inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

export async function setWorkFolder() {
  const answers = await inquirer.prompt([
    {
      type: "file-tree-selection",
      name: "folder",
      root: os.homedir(),
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

  config.set("workFolder", folder);
  console.log(`\nThis folder is set as a working folder: ${folder}`);
  main();
}
