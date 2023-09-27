import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../layout';
import Dock from "../components";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dock/>} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default AppRouter;
