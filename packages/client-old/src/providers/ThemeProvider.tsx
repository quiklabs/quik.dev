import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from "styled-components";

const theme = {};

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    border: 0;
  }

  body {
    min-height: 100vh;
  }
`;

interface ThemeProviderProps {
  children: React.ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
}

export default ThemeProvider;
