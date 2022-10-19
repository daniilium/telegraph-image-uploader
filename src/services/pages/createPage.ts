import fetch from "node-fetch";
import { DEFAULT_TOKEN } from "../constants.js";
import { getAccount } from "../index.js";
import { ContentNode, ErrorMessage, NewPage } from "../types.js";
import config from "conf";

export async function createPage(
  title: string,
  content: ContentNode[],
  token: string
): Promise<NewPage | ErrorMessage> {
  const account = await getAccount(token);
  if (!account.ok) return;

  const request = fetch(`https://api.telegra.ph/createPage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      access_token: token,
      content: content,
      title: title,
      author_name: account.result.author_name,
      author_url: account.result.author_url,
    }),
  });

  const response = await request;

  if (response.status !== 200)
    return {
      ok: false,
      error: `ERROR: ${response.status} ${response.statusText}`,
    };
  return (await response.json()) as NewPage | ErrorMessage;
}
