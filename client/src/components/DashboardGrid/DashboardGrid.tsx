import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CategoriesChart from "../CategoriesChart/CategoriesChart.tsx";
import BalanceCard from "../BalanceCard/BalanceCard.tsx";
import GoalsGrid from "../GoalsGrid/GoalsGrid.tsx";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {useAppSelector, useAppDispatch} from "../../store/hooks.ts";
import { openModal } from "../../store/modal/modalSlice";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const Item = styled(Paper)(({theme}) => ({
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

const ICONS_MAP: Record<IconType, JSX.Element> = {
    balance: <SavingsIcon sx={{ color: '#2196F3', fontSize: 80 }} />,
    income: <TrendingUpIcon sx={{ color: '#4CAF50', fontSize: 80 }} />,
    expense: <TrendingDownIcon sx={{ color: '#F44336', fontSize: 80 }} />
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
        <Box sx={{flexGrow: 1, mt: 5}}>
            <Grid container spacing={2}>
                {cards.map((card) => (
                    <Grid size={4} key={card.type}>
                        <Item>
                            <BalanceCard
                                icon={ICONS_MAP[card.type]}
                                title={card.title}
                                balance={card.balance}
                            />
                        </Item>
                    </Grid>
                ))}
                <Grid size={6}>
                    <Item>Income and Expenses by Month</Item>
                </Grid>
                <Grid size={6}>
                    <Item>
                        <CategoriesChart/>
                    </Item>
                </Grid>
                <Grid size={12}>
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
