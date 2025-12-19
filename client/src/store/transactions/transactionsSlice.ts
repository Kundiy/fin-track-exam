import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {Transaction, TransactionsInitialState} from "../../types";
import axios from "axios";

const initialState: TransactionsInitialState = {
    transactions: [],
    error: ''
};

const API_URL = import.meta.env.VITE_API_KEY;
const TRANSACTIONS_URL = `${API_URL}/transactions`;
export const client = axios.create({
    headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
});

export const getTransactionsByUser = createAsyncThunk(
    'transactions/getTransactions',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await client.get(TRANSACTIONS_URL);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTransactionsByUser.fulfilled, (state, action) => {
                state.transactions = action.payload.map((transaction: Transaction) => {
                    const {category_type_id: categoryTypeId, ...rest} = transaction;
                    return {...rest, categoryTypeId}
                })
            })

            .addCase(getTransactionsByUser.rejected, (state, action) => {
                    state.error = action.payload as string;
                })
            },
    });

export default transactionsSlice.reducer;