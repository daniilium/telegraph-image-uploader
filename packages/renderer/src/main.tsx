import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import "../index.css";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route index element={<StepOne />} />
        <Route path="step-two" element={<StepTwo />} />
        <Route path="step-three" element={<StepThree />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
