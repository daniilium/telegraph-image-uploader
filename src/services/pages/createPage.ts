import fetch from "node-fetch";
import { ContentNode, ErrorMessage, NewPage, Page } from "../types.js";

export async function createPage(
  title: string,
  content: ContentNode[],
  token: string
): Promise<NewPage | ErrorMessage> {
  const convert = (content: ContentNode[]) => JSON.stringify(content);

  const request = fetch(
    `https://api.telegra.ph/createPage?access_token=${token}` +
      `&title=${title}` +
      `&content=${convert(content)}&return_content=false`,
    { method: "GET" }
  );

  const response = await request;

  return (await response.json()) as NewPage | ErrorMessage;
}
