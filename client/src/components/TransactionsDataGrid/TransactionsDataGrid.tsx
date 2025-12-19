import type {Transaction} from "../../types";
import {useMemo} from "react";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {Box, Tooltip} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {INCOME_CATEGORY_ID} from "../../constants/categoryTypes.ts";

type TransactionsProps = {
    transactions: Transaction[]
}

const prepareRows = (transactions: Transaction[]) => {
    const sorted = [...transactions].sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime());
    // console.log(sorted);
    const result: any[] = [];
    let lastDate = '';

    sorted.forEach((item) => {
        if (item.when !== lastDate) {
            // Додаємо рядок-заголовок для нової дати
            result.push({
                id: `header-${item.id}`,
                // id: item.id,
                isHeader: true,
                date: item.when.split('T')[0],
                amount: transactions
                    .filter(t => t.when === item.when)
                    .reduce((sum, t) => sum + Number(t.amount), 0)
            });
            // lastDate = item.when;
            lastDate = item.when.split('T')[0];
        }
        result.push({ ...item, isHeader: false });
    });
    return result;
}

function TransactionsDataGrid({transactions}: TransactionsProps) {
    const rows = useMemo(() => prepareRows(transactions), [transactions]);
    console.log(rows[0]);
    const columns: GridColDef[] = [
        { field: 'category', headerName: 'Category', flex: 1,
            renderCell: (params) => params.row.isHeader ? '' : params.row.name
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 80,
            renderCell: (params) => {
                if (params.row.isHeader) return null;
                const isIncome = params.row.categoryTypeId === INCOME_CATEGORY_ID; //
                return (
                    <Tooltip title={params.value}>
                        {isIncome ? (
                            <ArrowUpwardIcon sx={{ color: '#4CAF50' }} /> // Зелена стрілка вгору
                        ) : (
                            <ArrowDownwardIcon sx={{ color: '#f44336' }} /> // Червона стрілка вниз
                        )}
                    </Tooltip>
                );
            }
        },
        { field: 'date', headerName: 'Date', width: 120,
            renderCell: (params) => params.row.when?.split('T')[0]
        },
        { field: 'description', headerName: 'Description', flex: 1.5,
            renderCell: (params) => params.row.isHeader ? '' : params.row.description
        },
        {
            field: 'amount',
            headerName: 'Balance/Amount',
            width: 150,
            renderCell: (params) => {
                const val = Number(params.value).toFixed(2); //
                return (
                    <Box sx={{ fontWeight: 'bold' }}>
                        {params.row.isHeader ? val : (params.value > 0 ? `+${val}` : val)}
                    </Box>
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => params.row.isHeader ? null : 'Delete | Edit' //
        }
    ];

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowClassName={(params) => params.row.isHeader ? 'date-header-row' : ''}
                sx={{
                    '& .date-header-row': {
                        backgroundColor: '#f9f9f9', // Колір фону для рядка з датою
                        fontSize: '1.1rem',
                        '& .MuiDataGrid-cell': {
                            borderBottom: '2px solid #ddd'
                        }
                    }
                }}
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default TransactionsDataGrid;