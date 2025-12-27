import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { GoalsState, Goal, RequestAddGoal } from "../../types/goal.types";
import axios from "axios";

const initialState: GoalsState = {
    goals: [],
    currentGoal: null,
    error: '',
};

const API_URL = import.meta.env.VITE_API_KEY;
const GOALS_URL = `${API_URL}/goals`;

export const client = axios.create();

client.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getGoals = createAsyncThunk<Goal[], void, { rejectValue: string }>(
    'goals/getGoals',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await client.get(GOALS_URL);
            return data.map((item: any) => ({
                id: item.id,
                name: item.name,
                goalAmount: item.goal_amount,
                goalTargetDate: item.goal_target_date,
                savedAmount: item.amount || '0',
            }));
        } catch (error) {
            console.log(error);
            return rejectWithValue("Error getting goals");
        }
    }
);

export const createGoal = createAsyncThunk<Goal, RequestAddGoal, { rejectValue: string }>(
    'goals/createGoal',
    async (newGoal: RequestAddGoal, { rejectWithValue }) => {
        try {
            const { data } = await client.post(GOALS_URL, {
                name: newGoal.name,
                goal_amount: newGoal.goalAmount,
                goal_target_date: newGoal.goalTargetDate,
            });
            return {
                id: data.id,
                name: data.name,
                goalAmount: data.goal_amount,
                goalTargetDate: data.goal_target_date,
                savedAmount: data.amount || '0',
            };
        } catch (error) {
            console.log(error);
            return rejectWithValue("Error creating goal");
        }
    }
);

export const updateGoal = createAsyncThunk<Goal, { id: string } & RequestAddGoal, { rejectValue: string }>(
    'goals/updateGoal',
    async ({ id, ...goalData }: { id: string } & RequestAddGoal, { rejectWithValue }) => {
        try {
            const { data } = await client.put(`${GOALS_URL}/${id}`, {
                name: goalData.name,
                goal_amount: goalData.goalAmount,
                goal_target_date: goalData.goalTargetDate,
            });
            return {
                id: data.id,
                name: data.name,
                goalAmount: data.goal_amount,
                goalTargetDate: data.goal_target_date,
                savedAmount: data.amount || '0',
            };
        } catch (error) {
            console.log(error);
            return rejectWithValue("Error updating goal");
        }
    }
);

export const deleteGoal = createAsyncThunk<string, string, { rejectValue: string }>(
    'goals/deleteGoal',
    async (goalId: string, { rejectWithValue }) => {
        try {
            await client.delete(`${GOALS_URL}/${goalId}`);
            return goalId;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Error deleting goal");
        }
    }
);

export const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        clearGoalError: (state) => {
            state.error = '';
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getGoals.fulfilled, (state, action) => {
                state.goals = action.payload;
                state.error = '';
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.error = action.payload || 'Error getting goals';
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.goals.push(action.payload);
                state.error = '';
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.error = action.payload || 'Error creating goal';
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                const index = state.goals.findIndex(g => g.id === action.payload.id);
                if (index !== -1) {
                    state.goals[index] = action.payload;
                }
                state.error = '';
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.error = action.payload || 'Error updating goal';
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.goals = state.goals.filter(g => g.id !== action.payload);
                state.error = '';
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.error = action.payload || 'Error deleting goal';
            });
    }
});

export const { clearGoalError } = goalsSlice.actions;
export default goalsSlice.reducer;
