import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {TEXT} from "../../../constants/textConstants.ts";
import * as React from "react";
import {useLoginFormLogic} from "../useLoginFormLogic.ts";

type LoginFormProps = {
    onCloseModal: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onCloseModal}) => {
    const {
        formState,
        errors,
        serverError,
        handleChange,
        handleSubmit,
        handleCancel
    } = useLoginFormLogic({onCloseModal});

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
                {TEXT.BUTTONS.LOGIN}
            </Typography>

            {serverError && (
                <Typography color="error" variant="body2" sx={{mb: 2, textAlign: 'center'}}>
                    {serverError}
                </Typography>
            )}

            <Grid container spacing={2}>
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.EMAIL}
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
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
                    {TEXT.BUTTONS.LOGIN}
                </Button>
            </Box>
        </Box>
    );
}

export default LoginForm;