import { createRoot } from "react-dom/client";
import App from "./App";
import { VisionUIControllerProvider } from "@quik/vision-ui";

const el = document.getElementById("root");

el &&
  createRoot(el).render(
    <VisionUIControllerProvider>
      <App />
    </VisionUIControllerProvider>,
  );
