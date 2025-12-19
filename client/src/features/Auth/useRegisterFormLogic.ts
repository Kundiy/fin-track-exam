import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useMemo, useState} from "react";
import * as React from "react";
import * as Yup from "yup";
import {clearRegistrationError, registerNewUser} from "../../store/user/userSlice.ts";
import type {FormErrors, UserData} from "../../types";

type UseRegisterFormProps = {
    onCloseModal: () => void;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|~`]).{8,}$/;
const passwordErrorMessage = '8+ chars. Must include: Uppercase, lowercase, number, and symbol.';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Мінімум 2 символи'),
    lastname: Yup.string()
        .required('Lastname is required'),
    email: Yup.string()
        .required('Email is required')
        .matches(emailRegex, 'Incorrect email format'),
    password: Yup.string()
        .min(6, 'Min 6 symbols')
        .required('Password is required')
        .matches(passwordRegex, passwordErrorMessage),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Repeat password is required'),
});

export const useRegisterFormLogic = ({onCloseModal}: UseRegisterFormProps) => {
    const dispatch = useAppDispatch();
    const registrationError = useAppSelector(state => state.user.error);

    const serverEmailError = useMemo(() => {
        if (registrationError && registrationError.includes('Email already exists')) {
            return registrationError;
        }
        return null;
    }, [registrationError]);

    const [formState, setFormState] = useState<UserData>({
        name: '',
        lastname: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });

        if (errors[name as keyof UserData]) {
            setErrors(prevErrors => ({...prevErrors, [name]: undefined}));
        }

        if (name === 'email' && registrationError) {
            dispatch(clearRegistrationError());
            console.log('Registration error cleared');
        }
    };

    // Stub to send form data
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});

        try {
            await validationSchema.validate(formState, {abortEarly: false});
            if (formState) {
                const {repeatPassword, ...userData} = formState;
                await dispatch(registerNewUser(userData)).unwrap();
                onCloseModal();
            }
        }
        catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors: FormErrors = {};
                error.inner.forEach(error => {
                    if (error.path) {
                        newErrors[error.path as keyof UserData] = error.message;
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
        serverEmailError,
        handleChange,
        handleSubmit,
        handleCancel,
    }
}