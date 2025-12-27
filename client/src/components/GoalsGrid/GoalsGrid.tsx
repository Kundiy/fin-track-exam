import { Box, Button, Card, CardContent, LinearProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from 'react';
import { getGoals, deleteGoal } from '../../store/goals/goalsSlice';
import { openModal } from '../../store/modal/modalSlice';
import type { RootState } from '../../store/store';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const GoalsGrid = () => {
    const dispatch = useAppDispatch();
    const goals = useAppSelector((state: RootState) => state.goals.goals);
    const transactions = useAppSelector((state: RootState) => state.transactions.transactions);

    useEffect(() => {
        dispatch(getGoals());
    }, [dispatch, transactions]);

    const handleEdit = (goal: any) => {
        dispatch(openModal({ type: 'EDIT_GOAL', props: goal }));
    };

    const handleDelete = (goalId: string) => {
        dispatch(deleteGoal(goalId));
    };

    const calculateProgress = (saved: string, target: string) => {
        const savedNum = parseFloat(saved) || 0;
        const targetNum = parseFloat(target) || 0;
        return targetNum === 0 ? 0 : Math.min((savedNum / targetNum) * 100, 100);
    };

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
            {goals.map((goal) => {
                const progress = calculateProgress(goal.savedAmount, goal.goalAmount);
                const targetDate = new Date(goal.goalTargetDate + 'T00:00:00').toLocaleDateString();

                return (
                    <Card key={goal.id} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                {goal.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                                {targetDate}
                            </Typography>

                            <Box sx={{ my: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">
                                        Target: ${parseFloat(goal.goalAmount).toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2">
                                        Saved: ${parseFloat(goal.savedAmount).toFixed(2)}
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={progress}
                                    sx={{ height: 8, borderRadius: 4 }}
                                />
                                <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                                    {progress.toFixed(0)}%
                                </Typography>
                            </Box>
                        </CardContent>

                        <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => handleEdit(goal)}
                                sx={{ flex: 1 }}
                            >
                                Edit
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDelete(goal.id)}
                                sx={{ flex: 1 }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Card>
                );
            })}
        </Box>
    );
};

export default GoalsGrid;
