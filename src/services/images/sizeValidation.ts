import fs from "fs";
import path from "path";

const maxSizeInMegabytes = 1.5;

export async function sizeValidation(
  files: string[],
  folder: string
): Promise<string[]> {
  const getFullPath = (file: string) => path.join(folder, file);

  const bigFiles = files.filter((path: string) => {
    const size = getSize(getFullPath(path));

    if (size && size > maxSizeInMegabytes) return path;
  });

  return bigFiles;
}

function getSize(path: string): number | undefined {
  if (!exist(path)) return;
  const byte = fs.statSync(path).size;

  const convertByteToKilobyte = (n: number) => n / 1000;
  const convertByteToMegabyte = (n: number) => convertByteToKilobyte(n) / 1000;

  return convertByteToMegabyte(byte);
}

function exist(path: string): boolean {
  try {
    fs.accessSync(path);
    return true;
  } catch (e) {
    return false;
  }
}
