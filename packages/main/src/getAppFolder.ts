import * as os from "os";

export const getAppFolder = () => {
  const platform = os.platform();
  if (platform === "darwin") return __dirname;
};
