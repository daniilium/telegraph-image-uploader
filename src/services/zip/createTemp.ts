import fs from "fs";
import { TEMP_DIR } from "../constants.js";
import { isFolder } from "../index.js";

export async function createTemp() {
  if (isFolder(TEMP_DIR)) return;

  try {
    await fs.promises.mkdir(TEMP_DIR);
  } catch {
    console.log("ERROR: Create temp directory");
  }
}
