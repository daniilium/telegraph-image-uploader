import { configService } from "./ConfigService";
import { fileService } from "./FileService";
import { imageService } from "./ImageService";
import { telegraphService } from "./TelegraphService";
import { ContentNode } from "./TelegraphService.type";

class PageService {
  private token: string | undefined;
  private authorName: string | undefined;
  private authorUrl: string | undefined;
  private title: string | undefined;
  private endImage: string | undefined;
  private topTextNode: ContentNode | undefined;
  private folder: string | undefined;

  constructor() {
    this.setToken = this.setToken.bind(this);
    this.setAuthorName = this.setAuthorName.bind(this);
    this.setAuthorUrl = this.setAuthorUrl.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setEndImage = this.setEndImage.bind(this);
    this.setTopText = this.setTopText.bind(this);
    this.setFolder = this.setFolder.bind(this);

    this.create = this.create.bind(this);
    this.reset = this.reset.bind(this);
  }

  setToken(token: string) {
    this.token = token;
  }

  setAuthorName(name: string) {
    this.authorName = name;
  }

  setAuthorUrl(url: string) {
    this.authorUrl = url;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setFolder(path: string) {
    this.folder = path;
  }

  setTopText(text: string) {
    const convert = (text: string) => {
      const array = text.split(" ");
      return array.map((word) => word + " ");
    };

    this.topTextNode = { tag: "p", children: [...convert(text)] };
  }

  async setEndImage(fullPath: string) {
    const endImage = await imageService.uploadImage(fullPath);
    this.endImage = endImage.link;
  }

  reset() {
    this.token = undefined;
    this.title = undefined;
    this.endImage = undefined;
    this.topTextNode = undefined;
  }

  async create() {
    console.log(
      "create",
      `title: ${this.title}, token: ${this.token}, folder: ${this.folder}, name: ${this.authorName}, url: ${this.authorUrl}`
    );

    if (!this.title || !this.token || !this.folder) return;

    console.log("run");

    const files = await fileService.ls(this.folder);
    const images = imageService.filterImages(files);
    const sortImages = imageService.sort(images);
    const fullPaths = imageService.convertToFullPaths(sortImages, this.folder);
    const uploadedImages = await imageService.uploadImages(fullPaths);

    if (this.endImage) uploadedImages.push(this.endImage);

    const imageNodes: ContentNode[] =
      imageService.createImageTags(uploadedImages);

    if (this.topTextNode) imageNodes.unshift(this.topTextNode);

    return await telegraphService.createPage(
      this.title,
      imageNodes,
      this.token,
      this.authorName,
      this.authorUrl
    );
  }
}

export const pageService = new PageService();
