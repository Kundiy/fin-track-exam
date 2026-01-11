import { useAppDispatch } from "../store/hooks";
import {getCategoryById} from "../store/category/categorySlice.ts";
import {openModal} from "../store/modal/modalSlice.ts";

export const useCategoryActions = () => {
    const dispatch = useAppDispatch();

    const handleEditCategory = (categoryId: string) => {
        dispatch(getCategoryById(categoryId));
        dispatch(openModal({ type: 'EDIT_CATEGORY' }));
    };

    return {
        handleEditCategory,
    };
}