import {
    ADD_CONSTRUCTOR_INGREDIENT,
    CLEAR_CONSTRUCTOR_INGREDIENT,
    ConstructorIngredientsActions,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    UPDATE_CONSTRUCTOR_INGREDIENTS
} from "../../actions/constructor/constructorIngredients";
import {IIngredient} from "../../../types/IIngredient";

type TInitialState = {
    ingredients: ReadonlyArray<IIngredient>;
}

const initialState: TInitialState = {
    ingredients: [],
};

export const constructorIngredientsReducer = (state = initialState, action: ConstructorIngredientsActions) => {
    switch (action.type) {
        case UPDATE_CONSTRUCTOR_INGREDIENTS: {
            return {
                ...state,
                ingredients: [...action.ingredients]
            };
        }
        case ADD_CONSTRUCTOR_INGREDIENT: {
            let newIngredients = [...state.ingredients];
            if (action.ingredient.type === 'bun') {
                newIngredients = state.ingredients.filter(ingredient => ingredient.type !== 'bun');
                newIngredients = [action.ingredient, ...newIngredients, action.ingredient];
            } else {
                const currentBun = newIngredients.length !== 0 && newIngredients[0].type === 'bun' ? newIngredients[0] : null;
                if (currentBun == null) {
                    newIngredients = [
                        ...state.ingredients.filter(ingredient => ingredient.type !== 'bun'),
                        action.ingredient,
                    ]
                } else {
                    newIngredients = [
                        currentBun,
                        ...state.ingredients.filter(ingredient => ingredient.type !== 'bun'),
                        action.ingredient,
                        currentBun
                    ]
                }
            }

            return {
                ...state,
                ingredients: [...newIngredients]
            };
        }
        case REMOVE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient, index) => index !== action.index)
            };
        }
        case CLEAR_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                ingredients: []
            };
        }
        default: {
            return state;
        }
    }
};