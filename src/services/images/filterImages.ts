import path from "path";

export function filterImages(files: string[]): string[] {
  return files.filter((file: string) => {
    const allowedExtname = [".jpg", ".png", ".jpeg"];
    const extname = path.extname(file);
    if (allowedExtname.includes(extname)) return file;
  });
}
