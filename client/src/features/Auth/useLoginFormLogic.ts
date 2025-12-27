import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useMemo, useState} from "react";
import * as React from "react";
import * as Yup from "yup";
import {clearLoginError, loginUser} from "../../store/user/userSlice.ts";
import type {FormErrors} from "../../types";

type UseLoginFormProps = {
    onCloseModal: () => void;
}

type LoginFormState = {
    email: string;
    password: string;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .matches(emailRegex, 'Incorrect email format'),
    password: Yup.string()
        .required('Password is required')
});

export const useLoginFormLogic = ({onCloseModal}: UseLoginFormProps) => {
    const dispatch = useAppDispatch();
    const loginError = useAppSelector(state => state.user.error);

    const serverError = useMemo(() => {
        if (loginError) {
            return loginError;
        }
        return null;
    }, [loginError]);

    const [formState, setFormState] = useState<LoginFormState>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });

        if (errors[name as keyof LoginFormState]) {
            setErrors(prevErrors => ({...prevErrors, [name]: undefined}));
        }

        if (loginError) {
            dispatch(clearLoginError());
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});

        try {
            await validationSchema.validate(formState, {abortEarly: false});
            if (formState) {
                await dispatch(loginUser(formState)).unwrap();
                onCloseModal();
            }
        }
        catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors: FormErrors = {};
                error.inner.forEach(error => {
                    if (error.path) {
                        newErrors[error.path as keyof LoginFormState] = error.message;
                    }
                });
                setErrors(newErrors);
            }
        }
    };

    const handleCancel = () => {
        onCloseModal();
    };

    return {
        formState,
        errors,
        serverError,
        handleChange,
        handleSubmit,
        handleCancel
    };
};
