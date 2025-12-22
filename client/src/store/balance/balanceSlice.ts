import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {EXPENSE_CATEGORY_ID, INCOME_CATEGORY_ID} from "../../constants/categoryTypes.ts";

type BalanceState = {
    amount: string;
    expenses: string;
    income: string;
    error?: string;
}

const initialState: BalanceState = {
    amount: '0.00',
    expenses: '0.00',
    income: '0.00',
    error: undefined,
};

const API_URL_BALANCE = import.meta.env.VITE_API_KEY;
const API_URL_BALANCE_CATEGORY_TYPE = import.meta.env.VITE_API_KEY;
const BALANCE_URL = `${API_URL_BALANCE}/transactions/balance`;
const BALANCE_CATEGORY_TYPE_URL = `${API_URL_BALANCE_CATEGORY_TYPE}/categories`;
export const client = axios.create({
    headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
});

export const getBalanceByUser = createAsyncThunk(
    'balance/getBalance',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await client.get(BALANCE_URL);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)

export const getBalanceByCategoryType = createAsyncThunk(
    'balance/getBalanceByCategoryType',
    async (typeId: string, {rejectWithValue}) => {
        try {
            const response = await client.get(`${BALANCE_CATEGORY_TYPE_URL}?categoryTypeId=${typeId}`);

            return {
                data: response.data,
                typeId: typeId,
            };

        } catch (error) {
            console.log(error);
            return rejectWithValue("Error getting balance by category type");
        }
    }
)

export const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBalanceByUser.fulfilled, (state, action) => {
                state.amount = action.payload.amount;
                state.error = '';
            })
            .addCase(getBalanceByUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        builder
            .addCase(getBalanceByCategoryType.fulfilled, (state, action) => {
                const {data, typeId} = action.payload;

                if (typeId === INCOME_CATEGORY_ID) {
                    state.income = data.amount;
                } else if (typeId === EXPENSE_CATEGORY_ID) {
                    state.expenses = data.amount;
                }
                state.error = '';
            })
            .addCase(getBalanceByCategoryType.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }

});

export default balanceSlice.reducer;