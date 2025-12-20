import {Box, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {openDeleteDialog} from "../../store/confirmationDialog/confirmationDialogSlice.ts";

export const createColumns = (onEdit: (id: string) => void, dispatch: any) => [
    {
        field: 'name',
        headerName: 'Name',
        width: 560,
        sortable: true,
        renderCell: (params: any) => (
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5}}>
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
        headerAlign: 'center',
        disableColumnMenu: true,
        renderCell: (params: any) => {
            const value = Number(params.value || 0).toFixed(2);
            return (<Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
                <AttachMoneyIcon fontSize="inherit" sx={{color: 'text.secondary'}}/>
                {value}
            </Box>)
        },
    },
    {
        field: 'action',
        headerName: 'Action',
        width: 150,
        sortable: false,
        filterable: false,
        renderCell: (params: any) => (
            <Stack direction="row" spacing={1} sx={{justifyContent: 'center', width: '100%'}}>
                <Tooltip title="Edit">
                    <IconButton
                        size="small"
                        className="action-button edit-btn"
                        onClick={() => onEdit(params.row.id)}
                    >
                        <Edit fontSize="small"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        size="small"
                        className="action-button delete-btn"
                        onClick={() => dispatch(openDeleteDialog({
                            id: params.row.id,
                            title: "Delete category?",
                            description: `Are you sure you want to delete "${params.row.name}"?`
                        }))}
                    >
                        <Delete fontSize="small"/>
                    </IconButton>
                </Tooltip>
            </Stack>
        ),
    },
];