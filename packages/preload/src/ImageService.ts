import * as fs from "fs";
import * as path from "path";
import { configService } from "./ConfigService";
import { fileService } from "./FileService";
import { ContentNode } from "./TelegraphService.type";

class ImageService {
  private maxSizeInMegabytes = 1.5;
  private imageList: string[] | undefined;
  private loadImageList: string[] | undefined;

  constructor() {
    this.filterImages = this.filterImages.bind(this);
    this.sort = this.sort.bind(this);

    this.getMaxSizeFile = this.getMaxSizeFile.bind(this);
    this.sizeValidation = this.sizeValidation.bind(this);

    this.convertToFullPaths = this.convertToFullPaths.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
    this.createImageTags = this.createImageTags.bind(this);
  }

  getMaxSizeFile(): number {
    return this.maxSizeInMegabytes;
  }

  filterImages(files: string[]): string[] {
    return files.filter((file: string) => {
      const allowedExtname = [".jpg", ".png", ".jpeg"];
      const extname = path.extname(file);
      if (allowedExtname.includes(extname)) return file;
    });
  }

  sort(files: string[]): string[] {
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

  async sizeValidation(files: string[], folder: string): Promise<string[]> {
    const getFullPath = (file: string) => path.join(folder, file);

    const bigFiles = files.filter((path: string) => {
      const size = fileService.size(getFullPath(path));
      if (size && size > this.maxSizeInMegabytes) return path;
    });

    return bigFiles;
  }

  convertToFullPaths(files: string[], folder: string) {
    return files.map((fileName) => path.join(folder, fileName));
  }

  async uploadImages(fullPaths: string[]): Promise<string[]> {
    const arrayPromise = fullPaths.map(
      async (path) => await this.uploadImage(path)
    );
    const result = await Promise.all(arrayPromise);

    return result.map((elem) => elem.link);
  }

  async uploadImage(fullPath: string) {
    const form = new FormData();
    const value = fs.readFileSync(fullPath);
    const blob = new Blob([value], { type: "image/png" });

    const filename = {
      filename: "blob",
      contentType: "image/png",
    };

    // @ts-ignore
    form.append("image", blob, filename);

    return await fetch("https://telegra.ph/upload", {
      method: "POST",
      body: form,
    })
      .then((result) => result.json())
      .then((result) => {
        // if (result.error) {
        //   console.log(result);
        //   // throw result.error;
        // }

        if (result[0] && result[0].src) {
          return {
            link: "https://telegra.ph" + result[0].src,
            path: result[0].src,
          };
        }

        throw new Error("Unknown error");
      });
  }

  createImageTags(images: string[]): ContentNode[] {
    return images.map(
      (link): ContentNode => ({ tag: "img", attrs: { src: link } })
    );
  }
}

export const imageService = new ImageService();
