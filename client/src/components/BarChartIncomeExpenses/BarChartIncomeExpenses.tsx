import { Box } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { useAppSelector } from '../../store/hooks';
import type { Transaction } from '../../types';

/**
 * BarChartIncomeExpenses component
 * Displays income and expenses by month using a bar chart
 * Uses transaction data to calculate monthly totals
 */
export default function BarChartIncomeExpenses() {
    const transactions = useAppSelector(state => state.transactions.transactions);

    // Process transactions to group by month
    const getMonthlyData = (transactionList: Transaction[]) => {
        const monthlyMap: Record<string, { month: string; income: number; expenses: number }> = {};

        transactionList.forEach((transaction) => {
            if (!transaction.when) return;

            const date = new Date(transaction.when);
            const monthKey = date.toLocaleString('default', { month: 'short', year: '2-digit' });
            const amount = parseFloat(transaction.amount) || 0;

            if (!monthlyMap[monthKey]) {
                monthlyMap[monthKey] = {
                    month: date.toLocaleString('default', { month: 'short' }),
                    income: 0,
                    expenses: 0
                };
            }

            // Determine if it's income or expense based on categoryTypeId
            // Income = '00000001-0000-0000-0000-000000000001'
            // Expense = '00000001-0000-0000-0000-000000000002'
            const isIncome = transaction.categoryTypeId === '00000001-0000-0000-0000-000000000001';

            if (isIncome) {
                monthlyMap[monthKey].income += amount;
            } else {
                monthlyMap[monthKey].expenses += amount;
            }
        });

        // Sort by date and return last 6 months
        return Object.values(monthlyMap).slice(-6);
    };

    const chartData = getMonthlyData(transactions);

    if (chartData.length === 0) return null;

    return (
        <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                        formatter={(value) => `$${Number(value).toFixed(2)}`}
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                    />
                    <Legend />
                    <Bar dataKey="income" fill="#4CAF50" name="Income" />
                    <Bar dataKey="expenses" fill="#F44336" name="Expenses" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}
