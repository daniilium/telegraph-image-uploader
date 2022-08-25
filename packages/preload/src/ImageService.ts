import * as path from "path";

interface IImageService {}

class ImageService implements IImageService {
  constructor() {
    this.filterImages = this.filterImages.bind(this);
  }

  filterImages(files: string[]) {
    return files.filter((file: string) => {
      const allowedExtname = [".jpg", ".png", ".jpeg"];
      const extname = path.extname(file);
      if (allowedExtname.includes(extname)) return file;
    });
  }
}

export const imageService = new ImageService();
