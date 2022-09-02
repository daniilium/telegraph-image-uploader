import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

// import "../index.css";
import { StepOne } from "./pages/Step1";
import { StepThree } from "./pages/Step3";
import { StepTwo } from "./pages/Step2";
import { theme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <HashRouter>
        <Routes>
          <Route index element={<StepOne />} />
          <Route path="step-two" element={<StepTwo />} />
          <Route path="step-three" element={<StepThree />} />
        </Routes>
      </HashRouter>
    </MantineProvider>
  </React.StrictMode>
);
