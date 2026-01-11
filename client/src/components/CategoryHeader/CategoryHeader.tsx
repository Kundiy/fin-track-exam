import {StyledButton} from "./CategoryHeader.styled.ts";
import {TEXT} from "../../constants/textConstants.ts";
import './CategoryHeader.scss';
import {useCategoriesHeaderLogic} from "../../features/Categories/useCategoriesHeaderLogic.ts";
import CategoryTypeToggleButtons from "../CategoryTypeToggleButtons/CategoryTypeToggleButtons.tsx";


function CategoryHeader() {
    const {
        handleAddCategoryClick
    } = useCategoriesHeaderLogic();

    return (
        <div className="category-header">
            <CategoryTypeToggleButtons />
            <StyledButton
                variant="contained"
                onClick={handleAddCategoryClick}
            >
                {TEXT.BUTTONS.NEW_CATEGORY}
            </StyledButton>
        </div>
    );
}

export default CategoryHeader;