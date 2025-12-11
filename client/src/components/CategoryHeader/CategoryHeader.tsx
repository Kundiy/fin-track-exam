import {StyledButton, StyledToggleButton, StyledToggleButtonGroup} from "./CategoryHeader.styled.ts";
import {TEXT} from "../../constants/textConstants.ts";
import './CategoryHeader.scss';
import {useCategoriesHeaderLogic} from "../../hooks/useCategoriesHeaderLogic.ts";


function CategoryHeader() {
    const {categoryType, handleChange, handleAddCategoryClick} = useCategoriesHeaderLogic();

    return (
        <div className="category-header">
            <StyledToggleButtonGroup
                color="standard"
                value={categoryType}
                exclusive
                onChange={handleChange}
                aria-label="Categories Type"
            >
                <StyledToggleButton
                    value={TEXT.BUTTONS.EXPENSES}
                >
                    {TEXT.BUTTONS.EXPENSES}
                </StyledToggleButton>

                <StyledToggleButton
                    value={TEXT.BUTTONS.INCOME}
                >
                    {TEXT.BUTTONS.INCOME}
                </StyledToggleButton>
            </StyledToggleButtonGroup>

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