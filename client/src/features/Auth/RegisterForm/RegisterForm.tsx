import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {TEXT} from "../../../constants/textConstants.ts";
import * as React from "react";
import {useRegisterFormLogic} from "../useRegisterFormLogic.ts";

type RegisterFormProps = {
    onCloseModal: () => void;
}
const RegisterForm: React.FC<RegisterFormProps> = ({onCloseModal}) => {
    const {
        formState,
        errors,
        serverEmailError,
        handleChange,
        handleSubmit,
        handleCancel
    } = useRegisterFormLogic({onCloseModal});

    const emailErrorText = errors.email || serverEmailError;
    const hasEmailError = !!emailErrorText;

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
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.LASTNAME}
                    name="lastname"
                    value={formState.lastname}
                    onChange={handleChange}
                    error={!!errors.lastname}
                    helperText={errors.lastname}
                />
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.EMAIL}
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    error={hasEmailError}
                    helperText={emailErrorText}
                />
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.PASSWORD}
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.REPEAT_PASSWORD}
                    name="repeatPassword"
                    type="password"
                    value={formState.repeatPassword}
                    onChange={handleChange}
                    error={!!errors.repeatPassword}
                    helperText={errors.repeatPassword}
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