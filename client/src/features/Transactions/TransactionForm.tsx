import {Box, Button, Grid, MenuItem, TextField, Typography} from "@mui/material";
import {useTransactionFormLogic} from "./useTrasactionFormLogic.ts";
import * as React from "react";
import {TEXT} from "../../constants/textConstants.ts";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

type TransactionFormProps = {
    onCloseModal: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({onCloseModal}) => {
    const {
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
    } = useTransactionFormLogic({onCloseModal});

    const isError = formState.amount !== '' && !/^\d*[.,]?\d*$/.test(formState.amount);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 2,
                minWidth: 300
            }}>
            <Typography variant="h5" gutterBottom align="center">
                {currentTransaction ? TEXT.FORMS.TRANSACTION_FORM_TITLE_UPDATE : TEXT.FORMS.TRANSACTION_FORM_TITLE}
            </Typography>
            <Grid container spacing={2}>
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.AMOUNT}
                    name="amount"
                    value={formState.amount}
                    onChange={handleChange}
                    error={isError}
                    helperText={isError ? "Please enter only numbers" : ""}
                    slotProps={{
                        htmlInput: {
                            inputMode: 'decimal',
                            step: "0.01"
                        }
                    }}
                />
                <TextField
                    select
                    label="Select Type"
                    value={formState.categoryTypeId}
                    onChange={handleTypeChange}
                    required
                    fullWidth
                >
                    {categoryTypes.map((option) => (
                        <MenuItem key={option.id} value={option.id}>{option.caption}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Select Category"
                    value={formState.categoryId}
                    onChange={handleCategoryChange}
                    disabled={!selectedCategoryType}
                    fullWidth
                    required
                    helperText={!selectedCategoryType ? "Please select type first" : ""}
                >
                    {categories.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Choose date"
                        value={formState.when ? dayjs(formState.when) : null}

                        onChange={(newValue) => {
                            const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
                            handleChange({
                                target: {name: 'when', value: formattedDate}
                            } as React.ChangeEvent<HTMLInputElement>);
                        }}
                        maxDate={dayjs()}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                required: true,
                            },
                        }}
                    />
                </LocalizationProvider>

                <TextField
                    fullWidth
                    label={TEXT.FORMS.DESCRIPTION}
                    name="description"
                    value={formState.description}
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
                    disabled={isError}
                >
                    {currentTransaction ? TEXT.BUTTONS.SAVE : TEXT.BUTTONS.CREATE }
                </Button>
            </Box>
        </Box>
    );
}

export default TransactionForm;