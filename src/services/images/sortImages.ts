import path from "path";

export function sortImages(files: string[]): string[] {
  const basename = (elem: string) => path.basename(elem, path.extname(elem));
  const getNumber = (name: string) =>
    parseInt(String(basename(name).match(/\d+/)));

  return files.sort((first, second) => {
    const one = getNumber(first);
    const two = getNumber(second);

    if (one < two) return -1;
    if (one > two) return 1;
    return 0;
  });
}
