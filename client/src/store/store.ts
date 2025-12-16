import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/modalSlice";
import userReducer from "./user/userSlice";
import categoriesReducer from "./category/categorySlice.ts";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        user: userReducer,
        categories: categoriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;