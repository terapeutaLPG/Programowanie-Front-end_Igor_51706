import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// render glownej aplikacji naszej
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
