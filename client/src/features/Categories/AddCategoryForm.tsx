import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {TEXT} from "../../constants/textConstants.ts";
import {StyledToggleButton, StyledToggleButtonGroup} from "../../components/CategoryHeader/CategoryHeader.styled.ts";
import {useState} from "react";
import type {CategoryType} from "../../types";
import * as React from "react";
// import {loginSuccessMock} from "../../store/user/userSlice.ts";

type AddCategoryFormProps = {
    onCloseModal: () => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({onCloseModal}) => {
    const [formState, setFormState] = useState({
        name: '',
        type: TEXT.BUTTONS.EXPENSES as CategoryType,
    });

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newCategoryType: CategoryType,
    ) => {
        if (newCategoryType) { // MUI ToggleButtonGroup передає null, якщо знято вибір
            setFormState(prevFormState => ({
                ...prevFormState,
                type: newCategoryType,
            }));
            console.log('Category Type Changed:', newCategoryType);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Create category:', formState);
        //dispatch(registerUser(formState))
        // dispatch(loginSuccessMock());
        onCloseModal();
    };

    const handleCancel = () => {
        onCloseModal();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 2,
                minWidth: 300
            }}
        >
            <Typography variant="h5" gutterBottom align="center" sx={{marginBottom: 4}}>
                {TEXT.FORMS.CATEGORY_FORM_TITLE}
            </Typography>

            <Grid container spacing={1}>
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.NEW_CATEGORY_INPUT_PLACEHOLDER}
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                />
                <StyledToggleButtonGroup
                    color="standard"
                    value={formState.type}
                    exclusive
                    onChange={handleChange}
                    aria-label="Categories Type"
                >
                    <StyledToggleButton
                        value={TEXT.BUTTONS.EXPENSES}
                    >Expenses</StyledToggleButton>
                    <StyledToggleButton
                        value={TEXT.BUTTONS.INCOME}
                    >Income</StyledToggleButton>
                </StyledToggleButtonGroup>
            </Grid>

            {/* Buttons */}
            <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4}}>
                <Button
                    variant="outlined"
                    onClick={handleCancel}
                >
                    {TEXT.BUTTONS.CANCEL}
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    {TEXT.BUTTONS.CREATE}
                </Button>
            </Box>
        </Box>
    );
}

export default AddCategoryForm;