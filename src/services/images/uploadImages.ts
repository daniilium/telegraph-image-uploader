import fs from "fs";
import path from "path";
import { uploadByBuffer } from "telegraph-uploader";

export async function uploadImages(fullPaths: string[], folder: string) {
  fullPaths = convertToFullPaths(fullPaths, folder);
  const arrayPromise = fullPaths.map(async (path) => await uploadImage(path));
  const result = await Promise.all(arrayPromise);

  return result.map((elem) => elem.link);
}

function convertToFullPaths(files: string[], folder: string) {
  return files.map((fileName) => path.join(folder, fileName));
}

async function uploadImage(fullPath: string) {
  const value = fs.readFileSync(fullPath);
  return uploadByBuffer(value, "image/png");
}
