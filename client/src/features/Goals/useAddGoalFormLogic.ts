import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useMemo, useState } from "react";
import * as React from "react";
import * as Yup from "yup";
import { clearGoalError, createGoal, updateGoal } from "../../store/goals/goalsSlice";
import type { GoalFormErrors } from "../../types/goal.types";
import type { RequestAddGoal } from "../../types/goal.types";

type UseAddGoalFormProps = {
    onCloseModal: () => void;
    goal?: RequestAddGoal & { id: string };
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Goal name is required')
        .min(2, 'Minimum 2 characters'),
    goalAmount: Yup.number()
        .required('Target amount is required')
        .positive('Amount must be positive'),
    goalTargetDate: Yup.string()
        .required('Target date is required'),
});

export const useAddGoalFormLogic = ({ onCloseModal, goal }: UseAddGoalFormProps) => {
    const dispatch = useAppDispatch();
    const goalError = useAppSelector(state => state.goals.error);

    const serverError = useMemo(() => {
        if (goalError) {
            return goalError;
        }
        return null;
    }, [goalError]);

    const [formState, setFormState] = useState<RequestAddGoal>({
        name: goal?.name || '',
        goalAmount: goal?.goalAmount || '',
        goalTargetDate: goal?.goalTargetDate || '',
    });

    const [errors, setErrors] = useState<GoalFormErrors>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });

        if (errors[name as keyof RequestAddGoal]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
        }

        if (goalError) {
            dispatch(clearGoalError());
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});

        try {
            await validationSchema.validate(formState, { abortEarly: false });
            
            if (goal?.id) {
                await dispatch(updateGoal({ id: goal.id, ...formState })).unwrap();
            } else {
                await dispatch(createGoal(formState)).unwrap();
            }
            onCloseModal();
        }
        catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors: GoalFormErrors = {};
                error.inner.forEach(error => {
                    if (error.path) {
                        newErrors[error.path as keyof RequestAddGoal] = error.message;
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
