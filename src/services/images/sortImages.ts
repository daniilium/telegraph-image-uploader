import path from "path";

export function sortImages(files: string[]): string[] {
  const basename = (elem: string) => path.basename(elem, path.extname(elem));
  const getNumber = (name: string): number => Number(name.match(/\d+/g));

  return files.sort((first, second) => {
    const one = getNumber(basename(first));
    const two = getNumber(basename(second));

    if (one < two) return -1;
    if (one > two) return 1;
    return 0;
  });
}
