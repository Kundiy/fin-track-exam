import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {TEXT} from "../../constants/textConstants.ts";
import * as React from "react";
import {useAddCategoryFormLogic} from "./useAddCategoryFormLogic.ts";

type AddCategoryFormProps = {
    onCloseModal: () => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({onCloseModal}: AddCategoryFormProps) => {
    const {
        formState,
        handleInputChange,
        handleSubmit,
        handleCancel
    } = useAddCategoryFormLogic({onCloseModal});

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