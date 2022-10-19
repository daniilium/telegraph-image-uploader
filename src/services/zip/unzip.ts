import StreamZip from "node-stream-zip";

import { clearTemp } from "../index.js";
import { TEMP_DIR } from "../constants.js";

export async function unzip(path: string) {
  await clearTemp();

  const zip = new StreamZip.async({ file: path });
  await zip.extract(null, TEMP_DIR);
  await zip.close();
}
