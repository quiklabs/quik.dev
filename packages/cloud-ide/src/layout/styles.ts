import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Container = styled.div`
    flex: 1;
    display: flex;
`;

export const TopBar = styled.div`
  height: 30px;
  background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 14px;
`;

export const SideMenu = styled.div`
    width: 60px;
    background: #2c2c2d;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
`;

export const Icon = styled.div`
    width: 30px;
    height: 30px;
    margin-bottom: 20px;
    background: #636363;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: #7c7c7c;
    }
`;

export const MainContent = styled.div`
    flex: 1;
    background: #1e1e1e;
    color: #d4d4d4;
    overflow: hidden;
`;

export const StatusBar = styled.div`
    height: 25px;
    background: #333;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 12px;
`;
