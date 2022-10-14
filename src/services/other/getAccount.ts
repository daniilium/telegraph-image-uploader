import fetch from "node-fetch";

import { API_URL } from "../constants.js";
import { AccountInfo, ErrorMessage } from "../types.js";

export const getAccount = async (token: string) => {
  const response = await fetch(
    `${API_URL}/getAccountInfo?access_token=${token}&fields=["short_name","author_name","author_url","auth_url","page_count"]`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const json = await response.json();
  return json as AccountInfo | ErrorMessage;
};
