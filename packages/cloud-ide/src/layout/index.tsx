import {
  AppContainer,
  TopBar,
  SideMenu,
  Icon,
  MainContent,
  StatusBar,
  Container,
} from "./styles";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppContainer>
      <TopBar>quik.dev</TopBar>
      <Container>
        <SideMenu>
          <Icon />
          <Icon />
          <Icon />
          <Icon />
          <Icon />
        </SideMenu>
        <MainContent>{children}</MainContent>
      </Container>
      <StatusBar>Branch: main</StatusBar>
    </AppContainer>
  );
};

export default Layout;
