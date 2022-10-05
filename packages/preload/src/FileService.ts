import * as os from "os";
import * as fs from "fs";
import * as path from "path";

import * as electron from "electron";
import * as StreamZip from "node-stream-zip";

class FileService {
  constructor() {
    this.getHomeDir = this.getHomeDir.bind(this);
    this.getTempDir = this.getTempDir.bind(this);
    this.ls = this.ls.bind(this);
    this.size = this.size.bind(this);
    this.clearTemp = this.clearTemp.bind(this);
    this.unzip = this.unzip.bind(this);
    this.copyText = this.copyText.bind(this);
  }

  read(path: string): string {
    return String(fs.readFileSync(path));
  }

  create(path: string, payload: string): void {
    fs.writeFileSync(path, payload);
  }

  exist(path: string): boolean {
    try {
      fs.accessSync(path);
      return true;
    } catch (e) {
      return false;
    }
  }

  getHomeDir() {
    return os.homedir();
  }

  getTempDir() {
    return path.join(os.tmpdir(), "/telegraph-image-uploader");
  }

  size(path: string): number | undefined {
    if (!this.exist(path)) return;
    const byte = fs.statSync(path).size;

    const convertByteToKilobyte = (n: number) => n / 1000;
    const convertByteToMegabyte = (n: number) =>
      convertByteToKilobyte(n) / 1000;

    return convertByteToMegabyte(byte);
  }

  async ls(path: string): Promise<string[]> {
    let result = [];

    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
      result.push(dirent.name);
    }

    return result;
  }

  private async createTemp() {
    try {
      await fs.promises.mkdir(this.getTempDir());
    } catch {}
  }

  async clearTemp() {
    await this.createTemp();
    const temp = this.getTempDir();

    const dir = await fs.promises.opendir(temp);
    for await (const dirent of dir) {
      const fullPath = path.join(temp, dirent.name);
      fs.stat(fullPath, (err, stat) => {
        if (stat.isDirectory()) fs.rmdirSync(fullPath);
        else fs.unlinkSync(fullPath);
      });
    }
  }

  async unzip(path: string) {
    await this.clearTemp();

    const temp = this.getTempDir();

    try {
      const zip = new StreamZip.async({ file: path });
      await zip.extract(null, temp);
      await zip.close();
    } catch (error) {
      console.log(error);
    }
  }

  copyText(text: string) {
    electron.clipboard.writeText(text);
  }
}

export const fileService = new FileService();
