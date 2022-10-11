import fs from "fs";

export function isFolder(path: string) {
  try {
    return fs.lstatSync(path).isDirectory();
  } catch {
    return false;
  }
}
