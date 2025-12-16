import {Box, Stack, Typography} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const createColumns = (onEdit: (id: string) => void) => [
    {
        field: 'name',
        headerName: 'Name',
        width: 560,
        sortable: true,
        renderCell: (params: any) => (
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, height: '100%',}}>
                {params.row.icon}
                <Typography variant="body2">{params.value}</Typography>
            </Box>
        ),
    },
    {
        field: 'amount',
        headerName: 'Turnover',
        width: 150,
        sortable: true,
        renderCell: (params: any) => (
            <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
                <AttachMoneyIcon fontSize="inherit" sx={{color: 'text.secondary'}}/>
                {params.value}
            </Box>
        ),
    },
    {
        field: 'action',
        headerName: 'Action',
        width: 150,
        sortable: false,
        filterable: false,
        renderCell: (params: any) => (
            <Box sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
            }}>
                <Stack direction="row" spacing={3}>
                    <Edit
                        color="primary"
                        style={{cursor: 'pointer'}}
                        // onClick={() => console.log('Редагувати рядок:', params.row.id)}
                        onClick={() => onEdit(params.row.id)}
                    />
                    <Delete
                        sx={{color: 'red', cursor: 'pointer'}}
                        onClick={() => console.log('Видалити рядок:', params.row.id)}
                    />
                </Stack>
            </Box>
        ),
    },
];