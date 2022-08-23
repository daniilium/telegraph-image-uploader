import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

let appPath: null | string = null;
export const appPathPromise = new Promise((resolve) => {
  setInterval(() => {
    if (appPath) resolve(appPath);
  }, 10);
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.electronAPI.handleMainToRender((event: any, value: string) => {
  if (value) appPath = value;
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
