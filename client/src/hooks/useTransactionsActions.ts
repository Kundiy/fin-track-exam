import { useAppDispatch } from "../store/hooks";
import {openModal} from "../store/modal/modalSlice.ts";
import {getTransactionById} from "../store/transactions/transactionsSlice.ts";

export const useTransactionActions = () => {
    const dispatch = useAppDispatch();

    const handleEditTransaction = (transactionId: string) => {
        dispatch(getTransactionById(transactionId));
        dispatch(openModal({ type: 'EDIT_TRANSACTION' }));
    };

    return {
        handleEditTransaction,
    };
}