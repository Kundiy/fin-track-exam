import {gridExpandedRowCountSelector, useGridApiContext, useGridSelector} from "@mui/x-data-grid";
import {Box, Typography} from "@mui/material";
import {TEXT} from "../../constants/textConstants.ts";

export const CustomFooter = () => {
    const apiRef = useGridApiContext();
    const rowCount = useGridSelector(apiRef, gridExpandedRowCountSelector);

    return (
        <Box sx={{
            p: 1,
            borderTop: '1px solid #e0e0e0',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }}>
            <Typography variant="body2">
                {TEXT.PAGES_TEXTS.CATEGORIES_FOOTER} {rowCount}
            </Typography>
        </Box>
    );
};