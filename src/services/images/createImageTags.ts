import { ContentNode } from "../types.js";

export function createImageTags(images: string[]): ContentNode[] {
  return images.map(
    (link): ContentNode => ({ tag: "img", attrs: { src: link } })
  );
}
