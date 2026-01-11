import './GoalsPage.scss';
import { TEXT } from "../../constants/textConstants.ts";
import { useAppDispatch } from '../../store/hooks.ts';
import { useEffect } from "react";
import { getGoals } from "../../store/goals/goalsSlice.ts";
import GoalsGrid from "../../components/GoalsGrid/GoalsGrid.tsx";
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { openModal } from '../../store/modal/modalSlice';

function GoalsPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getGoals());
    }, [dispatch]);

    const handleAddGoal = () => {
        dispatch(openModal({ type: 'ADD_GOAL' }));
    };

    return (
        <div className={'goals-wrapper'}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <h1 style={{ margin: 0 }}>{TEXT.MENU.GOALS}</h1>
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
        </div>
    );
}

export default GoalsPage;
