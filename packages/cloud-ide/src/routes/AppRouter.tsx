import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../layout';
import { Playground } from "../components/Playground";

const AppRouter: React.FC = () => {
    return (
        <Layout>
            <Playground/>
        </Layout>
    );
};

export default AppRouter;
