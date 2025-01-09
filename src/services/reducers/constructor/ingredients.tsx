import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    TIngredientsActions
} from '../../actions/constructor/ingredients';
import {IIngredient, IngredientType} from "../../../types/IIngredient";

type TIngredientsByType = {
    [IngredientType.BUN]: Array<IIngredient>;
    [IngredientType.MAIN]: Array<IIngredient>;
    [IngredientType.SAUCE]: Array<IIngredient>;
}

type TIngredientsById = {
    [name: string]: IIngredient
}

type TIngredientsState = {
    ingredientsByType: TIngredientsByType,
    ingredientsById: TIngredientsById,
    ingredientsRequest: boolean,
    ingredientsFailed: boolean
}

const initialState: TIngredientsState = {
    ingredientsByType: {
        bun: [],
        main: [],
        sauce: []
    },
    ingredientsById: {},
    ingredientsRequest: false,
    ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            const ingredientsByType = {
                bun: action.ingredients.filter(item => item.type === 'bun'),
                main: action.ingredients.filter(item => item.type === 'main'),
                sauce: action.ingredients.filter(item => item.type === 'sauce')
            }

            const ingredientsById: TIngredientsById = {};
            action.ingredients.map(item => ingredientsById[item._id] = item);

            return {
                ...state,
                ingredientsFailed: false,
                ingredientsByType: ingredientsByType,
                ingredientsById: ingredientsById,
                ingredientsRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            };
        }
        default: {
            return state;
        }
    }
};