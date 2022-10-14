import fs from "fs";

export async function getFiles(path: string): Promise<string[]> {
  let result = [];

  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    result.push(dirent.name);
  }

  return result;
}
