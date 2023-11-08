import {
  ThemeProvider,
  CssBaseline,
  theme,
  SignIn,
  SignUp,
} from "@quik/vision-ui";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function App() {
  return (
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
  );
}
