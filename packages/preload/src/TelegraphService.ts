import { Account, ContentNode, Page } from "./TelegraphService.type";

class TelegraphService {
  constructor() {
    this.createPage = this.createPage.bind(this);
    this.getAccount = this.getAccount.bind(this);
  }

  async getAccount(token: string): Promise<Account | undefined> {
    const request = fetch(
      `https://api.telegra.ph/getAccountInfo?access_token=${token}`,
      {
        method: "GET",
      }
    );

    const response = await request;
    const json = await response.json();

    if (json.ok) return json.result;
    if (!json.ok) throw new Error(json.error);
  }

  async createPage(
    title: string,
    content: ContentNode[],
    token: string,
    name: string | undefined,
    url: string | undefined
  ): Promise<Page | undefined> {
    const convert = (content: ContentNode[]) => JSON.stringify(content);

    const request = fetch(
      `https://api.telegra.ph/createPage?access_token=${token}` +
        `&title=${title}&author_name=${name}&author_url=${url}` +
        `&content=${convert(content)}&return_content=false`,
      { method: "GET" }
    );

    const response = await request;
    const json = await response.json();

    if (json.ok) return json.result;
    if (!json.ok) throw new Error(json.error);
  }
}

export const telegraphService = new TelegraphService();
