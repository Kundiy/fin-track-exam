import {TEXT} from "../../constants/textConstants.ts";
import './DashboardPage.scss';
import DashboardGrid from "../../components/DashboardGrid/DashboardGrid.tsx";

function DashboardPage() {
    return (
    <div className={'dashboard-wrapper'}>
        <h1>{TEXT.TITLES.DASHBOARD_PAGE}</h1>
        <DashboardGrid />
    </div>

    );
}

export default DashboardPage;