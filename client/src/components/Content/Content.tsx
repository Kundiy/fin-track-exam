import { Routes, Route } from 'react-router-dom';
import HomePage from "../../pages/HomePgae/HomePage.tsx";
import DashboardPage from "../../pages/DashboardPage/DashboardPage.tsx";
import CategoriesPage from "../../pages/CategoriesPage/CategoriesPage.tsx";
<<<<<<< HEAD
import TransactionsPage from "../../pages/TransactionsPage/TransactionsPage.tsx";
import GoalsPage from "../../pages/GoalsPage/GoalsPage.tsx";
=======
>>>>>>> 73585f6d0cc6907e5cc00a6d038d18f62c7a7758
import { TEXT } from '../../constants/textConstants';

function Content() {
    return (
        <div>
            <Routes>
                <Route path={TEXT.ROUTES.HOME} element={<HomePage />} />
                <Route path={TEXT.ROUTES.DASHBOARD} element={<DashboardPage />} />
                <Route path={TEXT.ROUTES.CATEGORIES} element={<CategoriesPage />} />
<<<<<<< HEAD
                <Route path={TEXT.ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
                <Route path={TEXT.ROUTES.GOALS} element={<GoalsPage />} />
=======
>>>>>>> 73585f6d0cc6907e5cc00a6d038d18f62c7a7758
            </Routes>
        </div>
    );
}

export default Content;
