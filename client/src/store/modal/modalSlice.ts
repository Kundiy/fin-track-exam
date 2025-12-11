import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Modal types for forms
type ModalType = 'REGISTER' | 'NEW_CATEGORY_FORM' | 'NONE';

type ModalState = {
    modalType: ModalType;
    isOpen: boolean;
    modalProps: any; // Additional props to pass to form
}

const initialState: ModalState = {
    modalType: 'NONE',
    isOpen: false,
    modalProps: {}
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        // To open modal
        openModal: (state, action: PayloadAction<{ type: ModalType, props?: any }>) => {
            state.modalType = action.payload.type;
            state.isOpen = true;
            state.modalProps = action.payload.props || {};
        },
        // To close modal and clear state
        closeModal: (state) => {
            state.modalType = 'NONE';
            state.isOpen = false;
            state.modalProps = {};
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;