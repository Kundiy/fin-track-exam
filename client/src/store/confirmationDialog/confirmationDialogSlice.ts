import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

type ActionType = 'DELETE_CATEGORY' | 'DELETE_TRANSACTION';
type DialogState = {
    open: boolean;
    title: string;
    description: string;
    confirmText: string;
    idToDelete: string | null;
    actionType: ActionType | null;
}

const initialState: DialogState = {
    open: false,
    title: '',
    description: '',
    confirmText: 'Delete',
    idToDelete: null,
    actionType: null,
};

type OpenDeleteDialogPayload = {
    id: string;
    actionType: ActionType;
    title?: string;
    description?: string;
}

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDeleteDialog: (state, action: PayloadAction<OpenDeleteDialogPayload>) => {
            state.open = true;
            state.idToDelete = action.payload.id;
            state.actionType = action.payload.actionType;
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