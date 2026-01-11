import './CategoriesPage.scss';
import CategoryHeader from "../../components/CategoryHeader/CategoryHeader.tsx";
import CategoriesDataGrid from "../../components/CategoryTable/CategoriesDataGrid.tsx";
import {TEXT} from "../../constants/textConstants.ts";
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {useEffect} from "react";
import {getCategoriesByType} from "../../store/category/categorySlice.ts";

function CategoriesPage() {
    const dispatch = useAppDispatch();
    const categoriesTypeId = useAppSelector(state => state.categories.currentType);

    useEffect(() => {
        dispatch(getCategoriesByType(categoriesTypeId));
    }, [dispatch, categoriesTypeId]);

    return (
        <div className={'categories-wrapper'}>
            <h1>{TEXT.TITLES.CATEGORIES_PAGE}</h1>
            <CategoryHeader />
            <CategoriesDataGrid />
        </div>
    );
}

export default CategoriesPage;