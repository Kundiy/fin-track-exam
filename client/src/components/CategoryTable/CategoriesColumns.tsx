import {Box, Stack, Typography} from "@mui/material";
import {Delete, Edit, Euro} from "@mui/icons-material";

export const columns = [
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
        field: 'expenses',
        headerName: 'Expenses',
        width: 150,
        sortable: true,
        renderCell: (params: any) => (
            <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
                <Euro fontSize="inherit" sx={{color: 'text.secondary'}}/>
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
                        onClick={() => console.log('Редагувати рядок:', params.row.id)}
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