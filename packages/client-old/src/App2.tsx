import "normalize.css/normalize.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PageLogin from "./pages/PageLogin";
import ThemeProvider from "./providers/ThemeProvider";

function App2() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<h1>hello</h1>} />
          <Route path="/login" element={<PageLogin />} />
          {/* <Route path="/sign-up" element={<SignUp />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App2;
