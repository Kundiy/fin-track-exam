import {useEffect, useState} from "react";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {clearCurrentCategory, createCategory, updateCategory} from "../../store/category/categorySlice.ts";

type UseAddCategoryFormProps = {
    onCloseModal: () => void;
}

export const useAddCategoryFormLogic = ({onCloseModal}: UseAddCategoryFormProps) => {
    const dispatch = useAppDispatch();
    const currentCategory = useAppSelector(state => state.categories.currentCategory)
    const currentCategoryType = useAppSelector(state => state.categories.currentType);
    const [formState, setFormState] = useState({
        id: '',
        name: '',
        categoryTypeId: currentCategoryType,
    });

    useEffect(() => {
        if (currentCategory) {
            setFormState(prev => ({
                ...prev,
                id: currentCategory.id,
                name: currentCategory.name ?? '',
                categoryTypeId: currentCategory.categoryTypeId ?? currentCategoryType,
            }));
        } else {
            setFormState({
                id: '',
                name: '',
                categoryTypeId: currentCategoryType,
            });
        }

    }, [currentCategory, currentCategoryType]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const isEditing = !!currentCategory;

        if (isEditing) {
            dispatch(updateCategory(formState));
        } else {
            const {id, ...newCategoryData} = formState;
            dispatch(createCategory(newCategoryData));
        }
        onCloseModal();
    };

    const handleCancel = () => {
        dispatch(clearCurrentCategory())
        onCloseModal();
    };

    return {
        currentCategory,
        formState,
        handleInputChange,
        handleSubmit,
        handleCancel,
    };
};