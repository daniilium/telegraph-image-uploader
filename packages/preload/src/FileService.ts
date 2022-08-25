import * as os from "os";
import * as fs from "fs";

export interface IFileService {
  // ls(path: string): string[] | [];
  read(path: string): string;
  create(path: string, payload: string): void;
  exist(path: string): boolean;
  getHomeDir(): string;
}

class FileService implements IFileService {
  constructor() {
    this.getHomeDir = this.getHomeDir.bind(this);
    this.ls = this.ls.bind(this);
    this.size = this.size.bind(this);
  }

  getHomeDir() {
    return os.homedir();
  }

  create(path: string, payload: string): void {
    fs.writeFileSync(path, payload);
  }

  read(path: string): string {
    return String(fs.readFileSync(path));
  }

  exist(path: string): boolean {
    try {
      fs.accessSync(path);
      return true;
    } catch (e) {
      return false;
    }
  }

  size(path: string) {
    if (!this.exist(path)) return;
    const byte = fs.statSync(path).size;

    const convertByteToKilobyte = (n: number) => n / 1000;
    const convertByteToMegabyte = (n: number) =>
      convertByteToKilobyte(n) / 1000;

    return convertByteToMegabyte(byte);
  }

  async ls(path: string) {
    let result = [];

    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
      result.push(dirent.name);
    }

    return result;
  }
}

export const fileService = new FileService();
