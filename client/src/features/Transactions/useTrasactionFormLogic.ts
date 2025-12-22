import {useEffect, useState} from "react";
import type {RequestAddTransaction, TransactionFormErrors} from "../../types";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getCategoriesByType} from "../../store/category/categorySlice.ts";
import {createTransaction} from "../../store/transactions/transactionsSlice.ts";

type TransactionFormProps = {
    onCloseModal: () => void;
}

export const useTransactionFormLogic = ({onCloseModal}: TransactionFormProps) => {
    const dispatch = useAppDispatch();
    const [errors, setErrors] = useState<TransactionFormErrors>({});

    const categoryTypes = useAppSelector(state => state.categories.types);
    const categories = useAppSelector(state => state.categories.categories);
    const [selectedCategoryType, setType] = useState('');
    console.log('selectedCategoryType', selectedCategoryType);

    useEffect(() => {
        dispatch(getCategoriesByType(selectedCategoryType));
    }, [dispatch, selectedCategoryType]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});

        if (formState) {
            dispatch(createTransaction(formState));
            onCloseModal();
        }
    }

    const handleCancel = () => {
        console.log('cancel');
        onCloseModal();
    }

    const [formState, setFormState] = useState<RequestAddTransaction>({
        amount: '',
        categoryTypeId: '',
        categoryId: '',
        when: '',
        description: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const normalizedValue = name === 'amount' ? value.replace(',', '.') : value;
        if(name === 'amount') {
            setFormState({
                ...formState,
                [name]: normalizedValue,
            });
            return;
        }
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedType = event.target.value;
        setFormState({
            ...formState,
            categoryTypeId: selectedType,
            categoryId: ''
        });
        setType(selectedType);
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            categoryId: event.target.value,
        });
    }

    return {
        handleSubmit,
        handleCancel,
        handleChange,
        handleTypeChange,
        handleCategoryChange,
        errors,
        formState,
        categoryTypes,
        categories,
        selectedCategoryType,
    }
};