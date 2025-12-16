import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {CategoryState, CategoryType, CategoryTypes, requestDate, responseDate} from "../../types";
import axios from "axios";
import {CATEGORY_TYPES, EXPENSE_CATEGORY_ID} from "../../constants/categotyTypes.ts";

const initialState: CategoryState = {
    types: [],
    categories: [],
    currentType: EXPENSE_CATEGORY_ID,
    currentCategory: null,
    error: '',
};

const API_URL = import.meta.env.VITE_API_KEY;
const CATEGORY_TYPES_URL = `${API_URL}/category-types`;
const CATEGORIES_URL = `${API_URL}/categories`;
export const client = axios.create({
    headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
});

export const getCategoryTypes = createAsyncThunk<CategoryTypes[], void, { rejectValue: string }>(
    'categories/getCategoryTypes',
    async () => {
        const {data} = await client.get(CATEGORY_TYPES_URL);
        return data.map((item: CategoryTypes) => {
            return {...item, ...CATEGORY_TYPES[item.id]}
        });
    })

export const getCategoriesByType = createAsyncThunk (
    'categories/getCategoriesByType',
    async (typeId: string, {rejectWithValue}) => {
        try {
            const {data} = await client.get(`${CATEGORIES_URL}?categoryTypeId=${typeId}`);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Error getting categories");
        }
    }
)

export const getCategoryById = createAsyncThunk (
    'categories/getCategoryById',
    async (categoryId: string, {rejectWithValue}) => {
        try {
            const {data} = await client.get(`${CATEGORIES_URL}/${categoryId}`);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Error getting category");
        }
    }
)

export const createCategory = createAsyncThunk<responseDate, requestDate, { rejectValue: string }>(
    'categories/createCategory',
    async (newCategory: requestDate, {rejectWithValue}) => {
        try {
            const {data} = await client.post(CATEGORIES_URL, newCategory);
            const {id, name, category_type_id, amount} = data;
            return {
                id: id,
                name: name,
                categoryTypeId: category_type_id,
                amount: amount,
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue("Error creating category");
        }
    })

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCurrentType: (state, action) => {
            state.currentType = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getCategoryTypes.fulfilled, (state, action) => {
                state.types = action.payload;
                state.currentType = action.payload[1].id;
            })
            .addCase(getCategoryTypes.rejected, (state, action) => {
                state.error = action.payload;
            });

        builder
            .addCase(getCategoriesByType.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            /*.addCase(getCategoriesByType.rejected, (state, action) => {
                state.error = action.payload;
            });*/

        builder
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.currentCategory = action.payload;
            })


        builder
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const {setCurrentType} = categorySlice.actions;
export default categorySlice.reducer;