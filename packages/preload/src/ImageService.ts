import * as path from "path";
import { configService, IConfigService } from "./ConfigService";
import { fileService, IFileService } from "./FileService";

interface IImageService {}

class ImageService implements IImageService {
  private fileService: IFileService;
  private configService: IConfigService;
  private maxSizeInMegabytes = 1.5;

  constructor(fileService: IFileService, configService: IConfigService) {
    this.fileService = fileService;
    this.configService = configService;

    this.filterImages = this.filterImages.bind(this);
    this.sort = this.sort.bind(this);
    this.sizeValidation = this.sizeValidation.bind(this);
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
}

export const imageService = new ImageService(fileService, configService);
