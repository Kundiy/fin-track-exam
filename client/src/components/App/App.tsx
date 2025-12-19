import './App.scss'
import Header from "../Header/Header.tsx";
import Content from "../Content/Content.tsx";
import AppModal from "../AppModal/AppModal.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setAuthToken} from "../../store/user/userSlice.ts";
import {deleteCategory, getCategoryTypes} from "../../store/category/categorySlice.ts";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";
import {closeDialog} from "../../store/confirmationDialog/confirmationDialogSlice.ts";

function App() {
    const dispatch = useAppDispatch();
    const isAuth = sessionStorage.getItem('token');
    const { open, title, description, confirmText, idToDelete } = useAppSelector(state => state.dialog);

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
            <Header/>
            <AppModal/>
            <ConfirmationDialog
                open={open}
                onClose={() => dispatch(closeDialog())}
                onConfirm={handleConfirm}
                title={title}
                description={description}
                confirmText={confirmText}/>
            <Content/>
        </>
    )
}

export default App
