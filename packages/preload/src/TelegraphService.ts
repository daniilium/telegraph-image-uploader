import { configService } from "./ConfigService";

interface ITelegraphService {}

export interface Account {
  short_name: string;
  author_name: string;
  author_url?: string;
  access_token?: string;
  auth_url?: string;
  page_count?: number;
}

export type contentNode = {
  tag:
    | "a"
    | "aside"
    | "b"
    | "blockquote"
    | "br"
    | "code"
    | "em"
    | "figcaption"
    | "figure"
    | "h3"
    | "h4"
    | "hr"
    | "i"
    | "iframe"
    | "img"
    | "li"
    | "ol"
    | "p"
    | "pre"
    | "s"
    | "strong"
    | "u"
    | "ul"
    | "video";
  children?: contentNode[] | string[];
  attrs?: {
    href?: string;
    src?: string;
  };
};

class TelegraphService {
  constructor() {
    this.createPage = this.createPage.bind(this);
    this.getAccount = this.getAccount.bind(this);
  }

  async getAccount() {
    const token = configService.readKey("token");

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

  async createPage(title: string, content: contentNode[]) {
    const token =
      "d3b25feccb89e508a9114afb82aa421fe2a9712b963b387cc5ad71e58722";

    const getContent = () => JSON.stringify(content);
    // const title = "тестовое сообщение";
    const author_name = "boom";
    const author_url = "http://ya.ru";

    const request = fetch(
      `https://api.telegra.ph/createPage?access_token=${token}&title=${title}&author_name=${author_name}&author_url=${author_url}&content=${getContent()}&return_content=false`,
      { method: "GET" }
    );

    const response = await request;
    const json = await response.json();

    if (json.ok) return json.result;
    if (!json.ok) throw new Error(json.error);
  }
}

export const telegraphService = new TelegraphService();
