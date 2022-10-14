export type CreateAccount = {
  ok: boolean;
  result: {
    short_name: string;
    author_name: string;
    author_url: string;
    access_token: string;
    auth_url: string;
  };
};

export type AccountInfo = CreateAccount & { result: { page_count: number } };

export type ErrorMessage = {
  ok: false;
  error: string;
};

export type ProfileForm = {
  shortName: string;
  authorName: string;
  authorUrl: string;
};

export type GetPageList = {
  ok: boolean;
  result: {
    total_count: number;
    pages: Page[];
  };
};

export type Page = {
  url: string;
  path: string;
  title: string;
  description: string;
  author_name: string;
  author_url: string;
  views: number;
  can_edit: boolean;
};

export type NewPage = {
  ok: true;
  result: Page;
};

export type ContentNode = {
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
  children?: ContentNode[] | string[];
  attrs?: {
    href?: string;
    src?: string;
  };
};
