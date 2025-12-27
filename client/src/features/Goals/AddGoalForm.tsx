import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { TEXT } from "../../constants/textConstants.ts";
import * as React from "react";
import { useAddGoalFormLogic } from "./useAddGoalFormLogic.ts";

type AddGoalFormProps = {
    onCloseModal: () => void;
    goal?: any;
}

const AddGoalForm: React.FC<AddGoalFormProps> = ({ onCloseModal, goal }) => {
    const {
        formState,
        errors,
        serverError,
        handleChange,
        handleSubmit,
        handleCancel
    } = useAddGoalFormLogic({ onCloseModal, goal });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 2,
                minWidth: 400
            }}
        >
            <Typography variant="h5" gutterBottom align="center">
                {goal ? 'Edit Goal' : 'Create Financial Goal'}
            </Typography>

            {serverError && (
                <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                    {serverError}
                </Typography>
            )}

            <Grid container spacing={2}>
                <TextField
                    required
                    fullWidth
                    label="Goal Name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    required
                    fullWidth
                    label="Target Amount"
                    name="goalAmount"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={formState.goalAmount}
                    onChange={handleChange}
                    error={!!errors.goalAmount}
                    helperText={errors.goalAmount}
                />
                <TextField
                    required
                    fullWidth
                    label="Target Date"
                    name="goalTargetDate"
                    type="date"
                    value={formState.goalTargetDate}
                    onChange={handleChange}
                    error={!!errors.goalTargetDate}
                    helperText={errors.goalTargetDate}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            {/* Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
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

export default AddGoalForm;
