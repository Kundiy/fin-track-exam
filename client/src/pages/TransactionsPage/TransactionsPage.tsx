import {TEXT} from "../../constants/textConstants.ts";
import './TransactionsPage.scss';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {getTransactionsByUser} from "../../store/transactions/transactionsSlice.ts";
import TransactionsDataGrid from "../../components/TransactionsDataGrid/TransactionsDataGrid.tsx";

function TransactionsPage() {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(state => state.transactions.transactions);

    useEffect(() => {
        dispatch(getTransactionsByUser());
    }, [dispatch]);

console.log(transactions[1]);
    return (
        <div className={'transactions-wrapper'}>
            <h1>{TEXT.TITLES.TRANSACTIONS_PAGE}</h1>
            <TransactionsDataGrid transactions={transactions}/>
        </div>
    );
}

export default TransactionsPage;