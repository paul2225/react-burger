import {IIngredient} from "../types/IIngredient";

export function calcBurgerPrice(ingredients: readonly IIngredient[]) {
    return ingredients
        .map(ingredient => ingredient.price)
        .reduce((acc, num) => acc + num, 0);
}