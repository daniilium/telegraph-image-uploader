/**
 * @module preload
 */

import { contextBridge, ipcRenderer } from "electron";

// Expose ipcRenderer.on via preload
contextBridge.exposeInMainWorld("electronAPI", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleMainToRender: (
    callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ) => ipcRenderer.on("main-to-render", callback),
});

export { sha256sum } from "./nodeCrypto";
export { versions } from "./versions";
