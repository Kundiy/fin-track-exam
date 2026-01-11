import {DataGrid} from '@mui/x-data-grid';
import {CustomFooter} from "./CustomFooter.tsx";
import {createColumns} from "./CategoriesColumns.tsx";
import './CategoriesDataGrid.scss';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {AccountBalanceWallet, MonetizationOn} from '@mui/icons-material';
import {EXPENSE_CATEGORY_ID} from "../../constants/categoryTypes.ts";
import {useCategoryActions} from "../../hooks/useCategoryActions.ts";

const CategoriesDataGrid = () => {
    const dispatch = useAppDispatch();
    const {handleEditCategory} = useCategoryActions();
    const tableColumns = createColumns(handleEditCategory, dispatch);
    const categories = useAppSelector(state => state.categories.categories);
    const currentTypeId = useAppSelector(state => state.categories.currentType);

    const dataRows = categories.map(category => ({
        ...category,
        icon: currentTypeId === EXPENSE_CATEGORY_ID
            ? <AccountBalanceWallet fontSize="small"/>
            : <MonetizationOn fontSize="small"/>
    }));

    return (
        <div className="category-table-wrapper">
            <DataGrid
                rows={dataRows}
                rowHeight={40}
                columns={tableColumns}
                localeText={{
                    noRowsLabel: 'No Categories',
                }}
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