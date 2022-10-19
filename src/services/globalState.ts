import conf from "conf";

class GlobalStateClass {
  private config: conf;

  constructor(config: conf) {
    this.config = config;
  }

  get token() {
    return this.config.get("token") as string | undefined;
  }

  set token(value: string) {
    this.config.set("token", value);
  }

  get workDir() {
    return this.config.get("workDir") as string | undefined;
  }

  set workDir(value: string) {
    this.config.set("workDir", value);
  }

  get images() {
    return this.config.get("images") as string[] | undefined;
  }

  set images(images: string[]) {
    this.config.set("images", images);
  }

  get folderPath() {
    return this.config.get("folderPath") as string | undefined;
  }

  set folderPath(path: string) {
    this.config.set("folderPath", path);
  }

  get pageName() {
    return this.config.get("pageName") as string | undefined;
  }

  set pageName(name: string) {
    this.config.set("pageName", name);
  }

  get isArchive() {
    return this.config.get("isArchive") as boolean;
  }

  set isArchive(bool: boolean) {
    this.config.set("isArchive", bool);
  }

  reset() {
    this.config.delete("images");
    this.config.delete("folderPath");
    this.config.delete("pageName");
    this.config.delete("isArchive");
  }

  resetAll() {
    this.config.delete("token");
    this.config.delete("workDir");

    this.reset();
  }
}

export const globalState = new GlobalStateClass(new conf());
