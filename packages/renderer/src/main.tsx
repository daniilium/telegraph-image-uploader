import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { StepOne } from "./StepOne";
import { StepThree } from "./StepThree";
import { StepTwo } from "./StepTwo";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<StepOne />} />
        <Route path="step-two" element={<StepTwo />} />
        <Route path="step-three" element={<StepThree />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
