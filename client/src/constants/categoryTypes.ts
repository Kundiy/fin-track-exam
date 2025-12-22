import type {CategoryTypes} from "../types";

type TIdObjects = {
    [key: string]: Partial<CategoryTypes>
}

export const INCOME_CATEGORY_ID = '00000001-0000-0000-0000-000000000001';
export const EXPENSE_CATEGORY_ID = '00000001-0000-0000-0000-000000000002';

export const CATEGORY_TYPES: TIdObjects = Object.freeze({
    [INCOME_CATEGORY_ID]: {
        caption: 'Income'
    },
    [EXPENSE_CATEGORY_ID]: {
        caption: 'Expense'
    },
    '00000001-0000-0000-0000-000000000003': {
        caption: 'Goal'
    }
})