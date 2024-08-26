import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Rooter from "./rooter";
import "./style/reset.css"
import "./style/main.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Rooter />
  </StrictMode>
);
