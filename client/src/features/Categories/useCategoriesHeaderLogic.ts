import {openModal} from "../../store/modal/modalSlice.ts";
import {useAppDispatch} from "../../store/hooks.ts";

export type UseCategoriesHeaderLogic = {
    handleAddCategoryClick: () => void;
}

export const useCategoriesHeaderLogic = (): UseCategoriesHeaderLogic => {
    const dispatch = useAppDispatch();

    const handleAddCategoryClick = () => {
        dispatch(openModal({type: 'NEW_CATEGORY_FORM'}));
    }

    return {
        handleAddCategoryClick,
    }
}