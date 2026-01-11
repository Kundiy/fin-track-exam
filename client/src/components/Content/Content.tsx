import { Routes, Route } from 'react-router-dom';
import HomePage from "../../pages/HomePgae/HomePage.tsx";
import DashboardPage from "../../pages/DashboardPage/DashboardPage.tsx";
import CategoriesPage from "../../pages/CategoriesPage/CategoriesPage.tsx";
import TransactionsPage from "../../pages/TransactionsPage/TransactionsPage.tsx";
import GoalsPage from "../../pages/GoalsPage/GoalsPage.tsx";
import { TEXT } from '../../constants/textConstants';

function Content() {
    return (
        <div>
            <Routes>
                <Route path={TEXT.ROUTES.HOME} element={<HomePage />} />
                <Route path={TEXT.ROUTES.DASHBOARD} element={<DashboardPage />} />
                <Route path={TEXT.ROUTES.CATEGORIES} element={<CategoriesPage />} />
                <Route path={TEXT.ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
                <Route path={TEXT.ROUTES.GOALS} element={<GoalsPage />} />
            </Routes>
        </div>
    );
}

export default Content;
