import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/modalSlice";
import userReducer from "./user/userSlice";
import categoriesReducer from "./category/categorySlice.ts";
import dialogReducer from "./confirmationDialog/confirmationDialogSlice.ts";
import balanceReducer from "./balance/balanceSlice.ts";

export const store = configureStore({
    reducer: {
        dialog: dialogReducer,
        modal: modalReducer,
        user: userReducer,
        balance: balanceReducer,
        categories: categoriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;