import {Dialog, DialogContent} from "@mui/material";
import RegisterForm from '../../features/Auth/RegisterForm/RegisterForm.tsx';
import LoginForm from '../../features/Auth/LoginForm/LoginForm.tsx';
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../store/hooks.ts";
import type {RootState} from "../../store/store.ts";
import {closeModal} from "../../store/modal/modalSlice.ts";
import AddCategoryForm from "../../features/Categories/AddCategoryForm.tsx";
import TransactionForm from "../../features/Transactions/TransactionForm.tsx";
import AddGoalForm from "../../features/Goals/AddGoalForm.tsx";

const MODAL_COMPONENTS: Record<string, React.FC<any>> = {
    'LOGIN': LoginForm,
    'REGISTER': RegisterForm,
    'NEW_CATEGORY_FORM': AddCategoryForm,
    'EDIT_CATEGORY': AddCategoryForm,
    'ADD_TRANSACTION': TransactionForm,
    'EDIT_TRANSACTION': TransactionForm,
};

const AppModal = () => {
    const dispatch = useAppDispatch();
    const { modalType, modalProps, isOpen } = useSelector((state: RootState) => state.modal);
    const SpecificContent = MODAL_COMPONENTS[modalType];

    const handleClose = () => {
        dispatch(closeModal());
    }

    if (!isOpen || modalType === 'NONE' || !SpecificContent) {
        return null;
    }

    return (
        <Dialog
            open={!!isOpen}
            onClose={handleClose}
            maxWidth="xs"
        >
            <DialogContent>
                <SpecificContent
                    {...modalProps}
                    onCloseModal={handleClose}
                />
            </DialogContent>
        </Dialog>
    );
};

export default AppModal;