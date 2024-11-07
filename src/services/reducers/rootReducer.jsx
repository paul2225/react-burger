import {combineReducers} from 'redux'
import {ingredientsReducer} from "./ingredients";
import {constructorIngredientsReducer} from "./constructorIngredients";
import {viewedIngredientReducer} from "./viewedIngredient";
import {createdOrderReducer} from "./createdOrder";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    viewedIngredient: viewedIngredientReducer,
    createdOrder: createdOrderReducer
});