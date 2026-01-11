import './App.scss'
import { Box } from '@mui/material';
import Header from "../Header/Header.tsx";
import Content from "../Content/Content.tsx";
import Menu from "../Menu/Menu.tsx";
import AppModal from "../AppModal/AppModal.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { setAuthToken } from "../../store/user/userSlice.ts";
import { deleteCategory, getCategoryTypes } from "../../store/category/categorySlice.ts";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";
import { closeDialog } from "../../store/confirmationDialog/confirmationDialogSlice.ts";
import type { RootState } from '../../store/store.ts';

function App() {
    const dispatch = useAppDispatch();
    const isAuth = sessionStorage.getItem('token');
    const { open, title, description, confirmText, idToDelete } = useAppSelector(state => state.dialog);
    const auth = useAppSelector((state: RootState) => state.user.isAuthenticated);

    useEffect(() => {
        dispatch(setAuthToken());
        dispatch(getCategoryTypes());
    }, [dispatch, isAuth]);

    const handleConfirm = () => {
        if (idToDelete) {
            dispatch(deleteCategory(idToDelete));
        }
        dispatch(closeDialog());
    };

    return (
        <>
            <Header />
            <AppModal />
            <ConfirmationDialog
                open={open}
                onClose={() => dispatch(closeDialog())}
                onConfirm={handleConfirm}
                title={title}
                description={description}
                confirmText={confirmText}
            />
            <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px', height: 'calc(100vh - 140px)' }}>
                {auth && (
                    <Box sx={{ flex: 'none', width: '250px', height: '100%', padding: 0 }}>
                        <Menu />
                    </Box>
                )}
                <Box sx={{ flex: 1, height: '100%', padding: 0 }}>
                    <Content />
                </Box>
            </Box>
        </>
    )
}

export default App
