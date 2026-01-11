import type {Transaction} from "../../types";
import {useMemo} from "react";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {Box, IconButton, Stack, Tooltip} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {EXPENSE_CATEGORY_ID, INCOME_CATEGORY_ID} from "../../constants/categoryTypes.ts";
import {Delete, Edit} from "@mui/icons-material";
import './TransactionsDataGrid.scss';
import {useAppDispatch} from "../../store/hooks.ts";
import {openDeleteDialog} from "../../store/confirmationDialog/confirmationDialogSlice.ts";
import {useTransactionActions} from "../../hooks/useTransactionsActions.ts";

type TransactionsProps = {
    transactions: Transaction[]
}

const prepareRows = (transactions: Transaction[]) => {
    const sorted = [...transactions].sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime());
    const result: any[] = [];
    let lastDate = '';

    sorted.forEach((item) => {
        const currentDate = item.when.includes('T') ? item.when.split('T')[0] : item.when;
        if (currentDate !== lastDate) {
            result.push({
                id: `header-${item.id}`,
                isHeader: true,
                date: currentDate,
                amount: transactions
                    .filter(t => (t.when.includes('T') ? t.when.split('T')[0] : t.when) === currentDate)
                    .reduce((sum, t) => sum + Number(t.amount), 0)
            });
            lastDate = currentDate;
        }
        result.push({...item, isHeader: false});
    });
    return result;
}


function TransactionsDataGrid({transactions}: TransactionsProps) {
    const dispatch = useAppDispatch();
    const {handleEditTransaction} = useTransactionActions();
    const rows = useMemo(() => {
        return prepareRows(transactions);
    }, [transactions]);


    const columns: GridColDef[] = [
        {
            field: 'category',
            headerName: 'Category',
            flex: 1,
            headerAlign: 'center',
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Box sx={{fontWeight: 500}}>
                    {params.row.isHeader ? params.row.date : params.row.name}
                </Box>
            )
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 80,
            headerAlign: 'center',
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                if (params.row.isHeader) return null;
                const isIncome = params.row.categoryTypeId === INCOME_CATEGORY_ID;
                const iconClass = `type-icon ${isIncome ? 'income' : 'expense'}`;

                return (
                    <Tooltip title={isIncome ? INCOME_CATEGORY_ID : EXPENSE_CATEGORY_ID}>
                        {isIncome ? (
                            <ArrowUpwardIcon className={iconClass} />
                        ) : (
                            <ArrowDownwardIcon className={iconClass} />
                        )}
                    </Tooltip>
                );
            }
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 120,
            headerAlign: 'center',
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Box sx={{fontWeight: 500}}>
                    {params.row.isHeader ? '' : params.row.when?.split('T')[0]}
                </Box>
            )
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1.5,
            sortable: false,
            disableColumnMenu: true,
            headerAlign: 'center',
            renderCell: (params) => {
                if (params.row.isHeader) return '';
                return (
                    <Box sx={{
                        py: 1,
                        width: '100%',
                        display: 'block',
                    }}>
                        {params.row.description}
                    </Box>
                );
            }
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 150,
            headerAlign: 'center',
            align: 'right',
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const val = Number(params.value).toFixed(2);
                return (
                    <Box sx={{
                        fontWeight: params.row.isHeader ? 800 : 500,
                        fontFamily: '"Roboto Mono", monospace',
                        width: '100%',
                        pr: 2
                    }}>
                        {params.row.isHeader ? val : (params.row.categoryTypeId !== INCOME_CATEGORY_ID) ? `-${val}` : `+${val}`}
                    </Box>
                );
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            sortable: false,
            disableColumnMenu: true,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                if (params.row.isHeader) return null;

                return (
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', height: '100%' }}>
                        <Tooltip title="Edit">
                            <IconButton
                                size="small"
                                className="action-button edit-btn"
                                onClick={() => handleEditTransaction(params.row.id)}
                            >
                                <Edit fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                            <IconButton
                                size="small"
                                className="action-button delete-btn"
                                onClick={() => dispatch(openDeleteDialog({
                                    id: params.row.id,
                                    actionType: 'DELETE_TRANSACTION',
                                    title: "Delete transaction?",
                                    description: `Are you sure you want to delete this transaction?`
                                }))}
                            >
                                <Delete fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                );
            }
        }
    ];

    return (
        <Box className="transactions-grid-container">
            <DataGrid
                rows={rows}
                columns={columns}
                getRowHeight={() => 'auto'}
                getRowClassName={(params) => params.row.isHeader ? 'date-header-row' : ''}
                getEstimatedRowHeight={() => 52}
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default TransactionsDataGrid;