import {styled} from "@mui/material";
import Button from "@mui/material/Button";

export const StyledButton = styled(Button)({
    backgroundColor: '#4CAF50',
    fontWeight: 600,
    padding: '5px 10px',
    maxHeight: 'fit-content',
    borderRadius: '10px',
    marginLeft: '15px',
    marginBottom: '2px',
    textTransform: 'capitalize',
    '&:hover': {
        backgroundColor: '#2e7d32',
        boxShadow: 6,
    },
})
