import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../layout';
import CodePlayground from "../components/CodePlayground";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<CodePlayground/>} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default AppRouter;
