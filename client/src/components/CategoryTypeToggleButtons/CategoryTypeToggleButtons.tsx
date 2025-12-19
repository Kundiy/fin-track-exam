import {StyledToggleButton, StyledToggleButtonGroup} from "./CategoryTypeToggleButtons.styled.ts";
import {useCategoryTypeToggleButtonsLogic} from "../../hooks/useCategoryTypeToggleButtonsLogic.ts";


function CategoryTypeToggleButtons() {
    const {
        currentCategory,
        categories,
        handleChange,
    } = useCategoryTypeToggleButtonsLogic();

    return (
        <div className="category-header">
            <StyledToggleButtonGroup
                color="standard"
                value={currentCategory?.id || categories[0]?.id}
                exclusive
                onChange={handleChange}
                aria-label="Categories Type"
            >
                {
                    categories.map((category) => {
                        return <StyledToggleButton
                            value={category.id}
                        >
                            {category.caption}
                        </StyledToggleButton>
                    })
                }
            </StyledToggleButtonGroup>
        </div>
    );
}

export default CategoryTypeToggleButtons;