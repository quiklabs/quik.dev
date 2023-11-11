import {
  ThemeProvider,
  CssBaseline,
  theme,
  VisionUIControllerProvider,
} from "@quik/vision-ui";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
export default function App() {
  return (
    <VisionUIControllerProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<h1>hello</h1>} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </VisionUIControllerProvider>
  );
}
