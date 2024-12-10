import {IIngredient} from "../../../types/IIngredient";

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const UPDATE_CONSTRUCTOR_INGREDIENTS = 'UPDATE_CONSTRUCTOR_INGREDIENTS';
export const CLEAR_CONSTRUCTOR_INGREDIENT = "CLEAR_CONSTRUCTOR_INGREDIENT";

interface AddConstructorIngredientAction {
    type: typeof ADD_CONSTRUCTOR_INGREDIENT;
    ingredient: IIngredient;
}

interface RemoveConstructorIngredientAction {
    type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;
    index: number;
}

interface UpdateConstructorIngredientsAction {
    type: typeof UPDATE_CONSTRUCTOR_INGREDIENTS;
    ingredients: ReadonlyArray<IIngredient>;
}

interface ClearConstructorIngredientAction {
    type: typeof CLEAR_CONSTRUCTOR_INGREDIENT;
}

export type ConstructorIngredientsActions =
    AddConstructorIngredientAction
    | RemoveConstructorIngredientAction
    | UpdateConstructorIngredientsAction
    | ClearConstructorIngredientAction