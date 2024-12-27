import {IIngredient} from "../../../types/IIngredient";

export const ADD_CONSTRUCTOR_INGREDIENT: 'ADD_CONSTRUCTOR_INGREDIENT' = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT: 'REMOVE_CONSTRUCTOR_INGREDIENT' = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const UPDATE_CONSTRUCTOR_INGREDIENTS: 'UPDATE_CONSTRUCTOR_INGREDIENTS' = 'UPDATE_CONSTRUCTOR_INGREDIENTS';
export const CLEAR_CONSTRUCTOR_INGREDIENT: 'CLEAR_CONSTRUCTOR_INGREDIENT' = 'CLEAR_CONSTRUCTOR_INGREDIENT';

interface IAddConstructorIngredientAction {
    type: typeof ADD_CONSTRUCTOR_INGREDIENT;
    ingredient: IIngredient;
}

interface IRemoveConstructorIngredientAction {
    type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;
    index: number;
}

interface IUpdateConstructorIngredientsAction {
    type: typeof UPDATE_CONSTRUCTOR_INGREDIENTS;
    ingredients: ReadonlyArray<IIngredient>;
}

interface IClearConstructorIngredientAction {
    type: typeof CLEAR_CONSTRUCTOR_INGREDIENT;
}

export type TConstructorIngredientsActions =
    IAddConstructorIngredientAction
    | IRemoveConstructorIngredientAction
    | IUpdateConstructorIngredientsAction
    | IClearConstructorIngredientAction