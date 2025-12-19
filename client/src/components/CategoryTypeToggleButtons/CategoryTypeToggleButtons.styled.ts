import {styled, ToggleButton, ToggleButtonGroup} from "@mui/material";

export const StyledToggleButton = styled(ToggleButton)({
    borderRadius: '10px !important',
    border: '1px solid #E0E0E0',
    textTransform: 'capitalize',
    fontWeight: 600,
    color: '#616161',
    padding: '6px 16px',

    '&.Mui-selected': {
        backgroundColor: 'white',
        color: '#1976D2',
        border: '1px solid #1976D2 !important',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: 'white',
        },
    },
    '&:not(.Mui-selected):hover': {
        backgroundColor: '#F5F5F5',
        border: '1px solid #E0E0E0',
    },
    '&.MuiToggleButtonGroup-lastButton': {
        marginLeft: '15px',
        border: '1px solid #E0E0E0',
    }
})

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
    border: 'none',
    display: 'flex',
    marginTop: '30px',
    width: 'fit-content',

    '& .MuiToggleButtonGroup-grouped': {
        border: '1px solid #E0E0E0',
    }
})