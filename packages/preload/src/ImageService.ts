import * as fs from "fs";
import * as path from "path";
import { configService, IConfigService } from "./ConfigService";
import { fileService, IFileService } from "./FileService";
import { contentNode } from "./TelegraphService";

interface IImageService {}

class ImageService implements IImageService {
  private fileService: IFileService;
  private configService: IConfigService;
  private maxSizeInMegabytes = 1.5;
  private imageList: string[] | undefined;
  private loadImageList: string[] | undefined;

  constructor(fileService: IFileService, configService: IConfigService) {
    this.fileService = fileService;
    this.configService = configService;

    this.filterImages = this.filterImages.bind(this);
    this.sort = this.sort.bind(this);
    this.sizeValidation = this.sizeValidation.bind(this);
    this.getMaxSizeFile = this.getMaxSizeFile.bind(this);
    this.setImageList = this.setImageList.bind(this);
    this.uploadImagesList = this.uploadImagesList.bind(this);
    this.getImageTags = this.getImageTags.bind(this);
  }

  filterImages(files: string[]) {
    return files.filter((file: string) => {
      const allowedExtname = [".jpg", ".png", ".jpeg"];
      const extname = path.extname(file);
      if (allowedExtname.includes(extname)) return file;
    });
  }

  sort(files: string[]) {
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

  sizeValidation(files: string[]) {
    const folder = this.configService.readKey("workFolder");
    const fullPath = (file: string) => path.join(folder, file);

    const errorsFiles = files.filter((path: string) => {
      const size = fileService.size(fullPath(path)) as number;
      if (size > this.maxSizeInMegabytes) return path;
    });

    return errorsFiles;
  }

  getMaxSizeFile() {
    return this.maxSizeInMegabytes;
  }

  setImageList(array: string[]) {
    this.imageList = array;
  }

  async uploadImagesList() {
    if (typeof this.imageList === "undefined") return;

    const workDir = configService.readKey("workFolder");
    const pathList = this.imageList.map((image) => path.join(workDir, image));

    const arrayPromise = pathList.map(
      async (elem) => await this.uploadImage(elem)
    );
    const result = await Promise.all(arrayPromise);

    this.loadImageList = result.map((elem) => elem.link);
  }

  private async uploadImage(path: string) {
    const form = new FormData();
    const value = fs.readFileSync(path);
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
        if (result.error) {
          console.log(result);
          // throw result.error;
        }

        if (result[0] && result[0].src) {
          return {
            link: "https://telegra.ph" + result[0].src,
            path: result[0].src,
          };
        }

        throw new Error("Unknown error");
      });
  }

  getImageTags() {
    if (!this.loadImageList) return;

    const result = [];
    for (let link of this.loadImageList) {
      const element = {
        tag: "img",
        attrs: { src: link },
      } as contentNode;

      result.push(element);
    }
    return result;
  }
}

export const imageService = new ImageService(fileService, configService);
