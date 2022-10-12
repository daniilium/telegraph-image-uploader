import fs from "fs";
import path from "path";
import rimraf from "rimraf";

import { TEMP_DIR } from "../constants.js";
import { createTemp } from "../index.js";

export async function clearTemp() {
  await createTemp();

  const dir = await fs.promises.opendir(TEMP_DIR);
  for await (const dirent of dir) {
    const fullPath = path.join(TEMP_DIR, dirent.name);
    rimraf(fullPath, () => {});
  }
}
