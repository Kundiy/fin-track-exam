import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CategoriesChart from "../CategoriesChart/CategoriesChart.tsx";
import BarChartIncomeExpenses from "../BarChartIncomeExpenses/BarChartIncomeExpenses.tsx";
import BalanceDisplayCard from "../BalanceDisplayCard/BalanceDisplayCard.tsx";
import GoalsGrid from "../GoalsGrid/GoalsGrid.tsx";

import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useAppSelector, useAppDispatch } from "../../store/hooks.ts";
import { openModal } from "../../store/modal/modalSlice";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import type { ReactNode } from "react";

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

type IconType = 'balance' | 'income' | 'expense';

const ICONS_MAP: Record<IconType, ReactNode> = {
    balance: <SavingsIcon sx={{ color: '#2196F3', fontSize: 80 }} />,
    income: <TrendingUpIcon sx={{ color: '#4CAF50', fontSize: 80 }} />,
    expense: <TrendingDownIcon sx={{ color: '#F44336', fontSize: 80 }} />
};

const COLOR_MAP: Record<IconType, string> = {
    balance: '#2196F3',
    income: '#4CAF50',
    expense: '#F44336'
};

export default function DashboardGrid() {
    const dispatch = useAppDispatch();
    const balance = useAppSelector(state => state.balance);
    const cards: { type: IconType; title: string, balance: string }[] = [
        { type: 'balance', title: 'Balance', balance: balance.amount },
        { type: 'income', title: 'Income', balance: balance.income },
        { type: 'expense', title: 'Expenses', balance: balance.expenses },
    ];

    const handleAddGoal = () => {
        dispatch(openModal({ type: 'ADD_GOAL' }));
    };

    return (
        <Box sx={{ flexGrow: 1, mt: 5 }}>
            <Grid container spacing={2}>
                {cards.map((card) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.type}>
                        <Item>
                            <BalanceDisplayCard
                                icon={ICONS_MAP[card.type]}
                                title={card.title}
                                value={card.balance}
                                displayColor={COLOR_MAP[card.type]}
                                prefix="$"
                            />
                        </Item>
                    </Grid>
                ))}
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <Item>
                        <Box sx={{ p: 2 }}>
                            <h3 style={{ margin: '0 0 20px 0' }}>Income and Expenses by Month</h3>
                            <BarChartIncomeExpenses />
                        </Box>
                    </Item>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <Item>
                        <CategoriesChart />
                    </Item>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Item sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <h3 style={{ margin: 0 }}>Financial Goals</h3>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleAddGoal}
                            >
                                Add Goal
                            </Button>
                        </Box>
                        <GoalsGrid />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
