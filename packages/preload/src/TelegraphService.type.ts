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

export type Account = {
  author_name: string;
  author_url: string;
};

export type Page = {
  path: string;
  url: string;
  title: string;
  description: string;
  author_name: string;
  author_url: string;
  views: number;
  can_edit: boolean;
};
