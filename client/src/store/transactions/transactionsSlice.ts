import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import moment from 'moment';
import type {
    RequestAddTransaction,
    Transaction,
    TransactionsInitialState
} from "../../types";
import axios from "axios";

const initialState: TransactionsInitialState = {
    transactions: [],
    currentTransaction: null,
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

export const getTransactionById = createAsyncThunk(
    'transactions/getTransactionById',
    async (transactionId: string, {rejectWithValue}) => {
        try {
            const {data} = await client.get(`${TRANSACTIONS_URL}/${transactionId}`);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)

export const createTransaction = createAsyncThunk<Transaction, RequestAddTransaction, { rejectValue: string }>(
    'transactions/createTransaction',
    async (newTransaction: RequestAddTransaction, {rejectWithValue}) => {
        const {id, ...rest} = newTransaction;
        try {
            const {data} = await client.post(TRANSACTIONS_URL, rest);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)

export const updateTransaction = createAsyncThunk<Transaction, Transaction, { rejectValue: string }>(
    'transactions/updateTransaction',
    async (updatedTransaction: Transaction, {rejectWithValue}) => {
        try {
            const transactionId = updatedTransaction.id;
            const {data} = await client.put(`${TRANSACTIONS_URL}/${transactionId}`, updatedTransaction);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)

export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async (transactionId: string, {rejectWithValue}) => {
        try {
            const {data} = await client.delete(`${TRANSACTIONS_URL}/${transactionId}`);
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
    reducers: {
        clearCurrentTransaction: (state) => {
            state.currentTransaction = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getTransactionsByUser.fulfilled, (state, action) => {
                state.transactions = action.payload.map((transaction: Transaction) => {
                    const {category_type_id: categoryTypeId, when, ...rest} = transaction;
                    const correctDate = moment(when).format('YYYY-MM-DD');

                    return {
                        ...rest,
                        categoryTypeId,
                        when: correctDate
                    };
                })
            })

            .addCase(getTransactionsByUser.rejected, (state, action) => {
                state.error = action.payload as string;
            })

        builder
            .addCase(createTransaction.fulfilled, (state, action) => {
                const {when, category_type_id: categoryTypeId, ...rest} = action.payload;
                const correctDate = moment(when).format('YYYY-MM-DD');
                const finalTransaction = {
                    ...rest,
                    when: correctDate,
                    categoryTypeId
                };
                state.transactions.push(finalTransaction);
            })

            .addCase(createTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
            })

        builder
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const {when, category_type_id: categoryTypeId, ...rest} = action.payload;
                const correctDate = moment(when).format('YYYY-MM-DD');
                const finalTransaction = {
                    ...rest,
                    when: correctDate,
                    categoryTypeId
                };
                const updatedTransactionIndex = state.transactions.findIndex((transaction) =>
                    transaction.id === action.payload.id
                );
                state.transactions.splice(updatedTransactionIndex, 1, finalTransaction);
                state.currentTransaction = null;
            })

            .addCase(updateTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
            })

        builder
            .addCase(getTransactionById.fulfilled, (state, action) => {
                const {
                    category_type_id: categoryTypeId,
                    category_id: categoryId,
                    amount,
                    when,
                    ...rest
                } = action.payload;

                state.currentTransaction = {
                    ...rest,
                    categoryId,
                    categoryTypeId,
                    amount: amount ? Number(amount).toFixed(2) : '0.00',
                    when: when ? moment(when).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
                };
            })

            .addCase(getTransactionById.rejected, (state, action) => {
                state.error = action.payload as string;
            })

        builder
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.transactions = state.transactions.filter((transaction) =>
                    transaction.id !== action.payload.id);
            })

            .addCase(deleteTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
            })

    },
});

export const {clearCurrentTransaction} = transactionsSlice.actions;
export default transactionsSlice.reducer;