import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CategoriesChart from "../CategoriesChart/CategoriesChart.tsx";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export default function DashboardGrid() {
    return (
        <Box sx={{ flexGrow: 1, mt: 5 }}>
            <Grid container spacing={2}>
                <Grid size={4}>
                    <Item>Balance</Item>
                </Grid>
                <Grid size={4}>
                    <Item>Income</Item>
                </Grid>
                <Grid size={4}>
                    <Item>Expenses</Item>
                </Grid>
                <Grid size={8}>
                    <Item>Income and Expenses by Month</Item>
                </Grid>
                <Grid size={4}>
                    <Item>
                        <h3>Expense Distribution by Category</h3>
                        <CategoriesChart />
                    </Item>
                </Grid>
                <Grid size={4}>
                    <Item>Financial Goals</Item>
                </Grid>
                <Grid size={4}>
                    <Item>Financial Goals</Item>
                </Grid>
                <Grid size={4}>
                    <Item>Financial Goals</Item>
                </Grid>
            </Grid>
        </Box>
    );
}
