import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {
    CategoryState,
    CategoryTypes,
    RequestDate, RequestUpdate,
    ResponseDate,
} from "../../types";
import axios from "axios";
import {CATEGORY_TYPES, EXPENSE_CATEGORY_ID} from "../../constants/categoryTypes.ts";

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

export const getCategoriesByType = createAsyncThunk(
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

export const getCategoryById = createAsyncThunk(
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

export const createCategory = createAsyncThunk<ResponseDate, RequestDate, { rejectValue: string }>(
    'categories/createCategory',
    async (newCategory: RequestDate, {rejectWithValue}) => {
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

export const updateCategory = createAsyncThunk<ResponseDate, RequestUpdate, { rejectValue: string }>(
    'categories/updateCategory',
    async (editingCategory: RequestUpdate, {rejectWithValue}) => {
        const categoryId = editingCategory.id;
        const categoryName = {name: editingCategory.name};
        try {
            const {data} = await client.put(`${CATEGORIES_URL}/${categoryId}`, categoryName);
            const {id, name, amount} = data;
            return {
                id: id,
                name: name,
                amount: amount,
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue("Error creating category");
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (categoryId: string, {rejectWithValue}) => {
        try {
            const {data} = await client.delete(`${CATEGORIES_URL}/${categoryId}`);
            const {id} = data;
            return id;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Error deleting category");
        }
    }
)

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCurrentType: (state, action) => {
            state.currentType = action.payload;
        },

        clearCurrentCategory: (state) => {
            state.currentCategory = null;
        }
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
            .addCase(getCategoriesByType.rejected, (state, action) => {
                state.error = action.payload as string;
            });

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

        builder
            .addCase(updateCategory.fulfilled, (state, action) => {
                const updatedCategoryIndex = state.categories.findIndex((category) => category.id === action.payload.id);
                state.categories.splice(updatedCategoryIndex, 1, action.payload);
                state.currentCategory = null;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.error = action.payload;
            });

        builder
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter((category) => category.id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
});

export const {setCurrentType, clearCurrentCategory} = categorySlice.actions;
export default categorySlice.reducer;