import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./sass/app.scss";
import ProviderApp from "./store/provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProviderApp />
  </StrictMode>
);
