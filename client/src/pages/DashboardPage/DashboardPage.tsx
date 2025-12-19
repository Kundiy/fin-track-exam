import {TEXT} from "../../constants/textConstants.ts";
import './DashboardPage.scss';
import DashboardGrid from "../../components/DashboardGrid/DashboardGrid.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "../../store/hooks.ts";
import {getBalanceByCategoryType} from "../../store/balance/balanceSlice.ts";
import {EXPENSE_CATEGORY_ID, INCOME_CATEGORY_ID} from "../../constants/categoryTypes.ts";

function DashboardPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBalanceByCategoryType(INCOME_CATEGORY_ID));
        dispatch(getBalanceByCategoryType(EXPENSE_CATEGORY_ID));
    }, [dispatch]);

    return (
    <div className={'dashboard-wrapper'}>
        <h1>{TEXT.TITLES.DASHBOARD_PAGE}</h1>
        <DashboardGrid />
    </div>

    );
}

export default DashboardPage;