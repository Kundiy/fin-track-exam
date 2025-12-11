import {useState} from "react";
import {TEXT} from "../constants/textConstants.ts";
import {openModal} from "../store/modal/modalSlice.ts";
import {useAppDispatch} from "../store/hooks.ts";
import type {CategoryType} from "../types";

export type UseCategoriesHeaderLogic = {
    categoryType: CategoryType;
    handleChange: (event: React.MouseEvent<HTMLElement>, newCategoryType: CategoryType) => void;
    handleAddCategoryClick: () => void;
}

export const useCategoriesHeaderLogic = (): UseCategoriesHeaderLogic => {
    const dispatch = useAppDispatch();
    const [categoryType, setCategoryType] = useState<CategoryType>(TEXT.BUTTONS.EXPENSES);

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newCategoryType: CategoryType,
    ) => {
        setCategoryType(newCategoryType);
    };

    const handleAddCategoryClick = () => {
        console.log('Add Category Clicked');
        dispatch(openModal({ type: 'NEW_CATEGORY_FORM' }));
    }

    return {
        categoryType,
        handleChange,
        handleAddCategoryClick,
    }
}