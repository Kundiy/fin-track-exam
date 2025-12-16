import {useEffect, useState} from "react";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {createCategory} from "../../store/category/categorySlice.ts";

type UseAddCategoryFormProps = {
    onCloseModal: () => void;
    // id?: string;
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

    /*useEffect(() => {
        setFormState({...formState, name: currentCategory?.name ?? ''});
    }, [currentCategory]);*/

    useEffect(() => {
        if (currentCategory) {
            setFormState(prev => ({
                ...prev,
                // 🚨 Заповнюємо ID та інші поля для редагування
                id: currentCategory.id,
                name: currentCategory.name ?? '',
                categoryTypeId: currentCategory.category_type_id ?? currentCategoryType,
            }));
        } else {
            // Режим створення: скидаємо id та ініціалізуємо
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
        dispatch(createCategory(formState))
        onCloseModal();
    };

    const handleCancel = () => {
        onCloseModal();
    };

    return {
        formState,
        handleInputChange,
        handleSubmit,
        handleCancel,
    };
};