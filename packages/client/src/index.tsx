import { createRoot } from "react-dom/client";
import App from "./App";

const el = document.getElementById("root");

el && createRoot(el).render(<App />);
