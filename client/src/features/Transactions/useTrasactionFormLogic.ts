import {useEffect, useState} from "react";
import type {Transaction, TransactionFormErrors} from "../../types";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getCategoriesByType} from "../../store/category/categorySlice.ts";
import {
    clearCurrentTransaction,
    createTransaction,
    updateTransaction
} from "../../store/transactions/transactionsSlice.ts";

type TransactionFormProps = {
    onCloseModal: () => void;
}

export const useTransactionFormLogic = ({onCloseModal}: TransactionFormProps) => {
    const dispatch = useAppDispatch();
    const [errors, setErrors] = useState<TransactionFormErrors>({});
    const categoryTypes = useAppSelector(state => state.categories.types);
    const categories = useAppSelector(state => state.categories.categories);
    const currentTransaction = useAppSelector(state => state.transactions.currentTransaction);
    const [selectedCategoryType, setType] = useState('');
    const [formState, setFormState] = useState<Transaction>({
        id: '',
        amount: '',
        categoryTypeId: '',
        categoryId: '',
        when: '',
        description: '',
    });

    useEffect(() => {
        dispatch(getCategoriesByType(selectedCategoryType));
    }, [dispatch, selectedCategoryType]);

    useEffect(() => {
        if(currentTransaction){
            setFormState(prev => ({
                ...prev,
                id: currentTransaction.id,
                categoryTypeId: currentTransaction.categoryTypeId ?? '',
                categoryId: currentTransaction.categoryId ?? '',
                when: currentTransaction.when ?? '',
                description: currentTransaction.description ?? '',
                amount: currentTransaction.amount ?? '',
            }));
            setType(currentTransaction.categoryTypeId ?? '');
        } else {
            setFormState(prev => ({
                ...prev,
                id: '',
                categoryTypeId: '',
                categoryId: '',
                when: '',
                description: '',
                amount: '',
            }));
        }

    }, [dispatch, currentTransaction]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});
        const isEditing = !!currentTransaction;

        if (isEditing) {
            dispatch(updateTransaction(formState));
            onCloseModal();
        } else {
            dispatch(createTransaction(formState));
            onCloseModal();
        }
    }

    const handleCancel = () => {
        dispatch(clearCurrentTransaction());
        onCloseModal();
    }

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
        currentTransaction,
        formState,
        categoryTypes,
        categories,
        selectedCategoryType,
    }
};