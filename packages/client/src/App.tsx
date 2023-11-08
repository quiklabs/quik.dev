import { ThemeProvider, CssBaseline, theme } from "@quik/vision-ui";
import Body from "./components";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Body />
    </ThemeProvider>
  );
}
