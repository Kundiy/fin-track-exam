export type Transaction = {
    id: string;
    categoryTypeId: string;
    categoryId: string;
    when: string;
    description: string;
    amount: string;
}

export type TransactionsInitialState = {
    transactions: Transaction[];
    currentTransaction: Transaction | null;
    error?: string;
};

export type RequestAddTransaction = Omit<Transaction, 'id'>;

export type TransactionFormErrors = {
    [key in keyof RequestAddTransaction]?: string;
}