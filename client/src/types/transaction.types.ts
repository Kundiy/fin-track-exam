export type Transaction = {
    id: string;
    categoryTypeId: string;
    name: string;
    when: string;
    description: string;
    amount: string;
}

export type TransactionsInitialState = {
    transactions: Transaction[];
    error?: string;
};