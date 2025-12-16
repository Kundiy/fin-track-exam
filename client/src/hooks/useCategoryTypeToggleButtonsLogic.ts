import {useState} from "react";
import * as React from "react";
import type {CategoryType, CategoryTypes} from "../types";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {EXPENSE_CATEGORY_ID, INCOME_CATEGORY_ID} from "../constants/categotyTypes.ts";
import {setCurrentType} from "../store/category/categorySlice.ts";

function isDefined<T>(argument: T | undefined | null): argument is T {
    return argument !== undefined && argument !== null;
}

export type UseCategoriesType = {
    categories: CategoryTypes[];
    currentCategory: CategoryTypes;
    handleChange: (event: React.MouseEvent<HTMLElement>, newCategoryType: CategoryType) => void;
}

export const useCategoryTypeToggleButtonsLogic = (): UseCategoriesType => {
    const dispatch = useAppDispatch();
    const categoryTypes = useAppSelector(state => state.categories.types);
    const expenseCategory = categoryTypes.find((item) => item.id === EXPENSE_CATEGORY_ID);
    const incomeCategory = categoryTypes.find((item) => item.id === INCOME_CATEGORY_ID);
    const categories = [expenseCategory, incomeCategory].filter(isDefined);
    const initialCategory = expenseCategory || categories[0];

    const [currentCategory, setCurrentCategory] = useState<CategoryTypes>(initialCategory as CategoryTypes);

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newCategoryType: CategoryType,
    ) => {
        const category = categoryTypes.find((item) => item.id === newCategoryType);
        if (category) {
            setCurrentCategory(category);
            dispatch(setCurrentType(category.id));
        }
    };

    return {
        categories,
        currentCategory,
        handleChange,
    }
}