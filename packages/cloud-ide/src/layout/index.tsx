import React from 'react';
import {AppContainer, TopBar, SideMenu, Icon, MainContent, StatusBar, Container} from './styles';
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <AppContainer>
            <TopBar>
                quik.dev
            </TopBar>
            <Container>
                <SideMenu>
                    <Link to="/">
                        <Icon />
                    </Link>
                    <Link to="/search">
                        <Icon />
                    </Link>
                    <Link to="/extensions">
                        <Icon />
                    </Link>
                </SideMenu>
                <MainContent>
                    {children}
                </MainContent>
            </Container>
            <StatusBar>
                Branch: main
            </StatusBar>
        </AppContainer>
    );
};

export default Layout;
