import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

type DialogState = {
    open: boolean;
    title: string;
    description: string;
    confirmText: string;
    idToDelete: string | null;
}

const initialState: DialogState = {
    open: false,
    title: '',
    description: '',
    confirmText: 'Delete',
    idToDelete: null,
};

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDeleteDialog: (state, action: PayloadAction<{id: string, title?: string, description?: string}>) => {
            state.open = true;
            state.idToDelete = action.payload.id;
            state.title = action.payload.title || 'Confirmation Delete';
            state.description = action.payload.description || 'Are you sure you want to delete this item?';
        },
        closeDialog: (state) => {
            state.open = false;
            state.idToDelete = null;
        },
    },
});

export const { openDeleteDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;