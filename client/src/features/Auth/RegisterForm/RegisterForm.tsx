import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useAppDispatch} from "../../../store/hooks";
import {loginSuccessMock} from "../../../store/user/userSlice.ts";
import {TEXT} from "../../../constants/textConstants.ts";
import * as React from "react";

type RegisterFormProps = {
    onCloseModal: () => void;
}
const RegisterForm: React.FC<RegisterFormProps> = ({onCloseModal}) => {
    const dispatch = useAppDispatch();
    const [formState, setFormState] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    // Stub to send form data
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Registration Data:', formState);
        //dispatch(registerUser(formState))
        dispatch(loginSuccessMock());
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
            <Typography variant="h5" gutterBottom align="center">
                {TEXT.FORMS.SIGN_UP}
            </Typography>

            <Grid container spacing={2}>
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.NAME}
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.LASTNAME}
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.EMAIL}
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.PASSWORD}
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.REPEAT_PASSWORD}
                    name="repeatPassword"
                    type="password"
                    value={formState.repeatPassword}
                    onChange={handleChange}
                />
            </Grid>

            {/* Buttons */}
            <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3}}>
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
                    {TEXT.BUTTONS.SIGN_IN}
                </Button>
            </Box>
        </Box>
    );
}

export default RegisterForm;