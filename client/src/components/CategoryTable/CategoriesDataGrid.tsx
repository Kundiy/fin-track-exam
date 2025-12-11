import {DataGrid} from '@mui/x-data-grid';
import {AccountCircle} from '@mui/icons-material';
import {CustomFooter} from "./CustomFooter.tsx";
import {columns} from "./CategoriesColumns.tsx";
import './CategoriesDataGrid.scss';
import {TEXT} from "../../constants/textConstants.ts";

// Example of data
const rows = [
    {id: 1, name: 'Іван Петров', expenses: 1500, icon: <AccountCircle fontSize="small"/>},
    {id: 2, name: 'Марія Сидорова', expenses: 320, icon: <AccountCircle fontSize="small"/>},
    {id: 3, name: 'Оліфвіег Іваівваненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 4, name: 'Осисмлег Іваніваіенко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 5, name: 'Овпалег Іваблроненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 6, name: 'Оуклег Іванршгшенко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 7, name: 'Ол657ег Іваненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 8, name: 'Окенлег Іванпаорпенко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 9, name: 'Окелег Івануненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 10, name: 'Олег Івангшненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 11, name: 'Оваплег Іваненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 12, name: 'Олег Іваненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 13, name: 'Олег Іваненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 14, name: 'Олег Іваненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 15, name: 'Олег Іваненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 16, name: 'Олег Іваненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 17, name: 'Олег Іваненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 18, name: 'Олег Іваненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 19, name: 'Олег Іваненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
    {id: 20, name: 'Олег Іваненко', expenses: 980, icon: <AccountCircle fontSize="small"/>},
];


const CategoriesDataGrid = () => {
    return (
        <div className="category-table-wrapper">
            <h3>{TEXT.TITLES.EXPENSES_CATEGORIES}</h3>
            <DataGrid
                rows={rows}
                rowHeight={40}
                columns={columns}
                slots={{
                    footer: CustomFooter,
                }}
                disableColumnMenu={true}
                disableColumnResize={true}
            />
        </div>
    );
};

export default CategoriesDataGrid;