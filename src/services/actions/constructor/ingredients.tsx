import {request} from "../../../utils/requests";
import {Dispatch} from "redux";
import {IIngredient} from "../../../types/IIngredient";

export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const CLEAR_INGREDIENTS: 'CLEAR_INGREDIENTS' = 'CLEAR_INGREDIENTS';

interface IGetIngredientsRequestAction {
    type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsSuccessAction {
    type: typeof GET_INGREDIENTS_SUCCESS;
    ingredients: IIngredient[]; // массив ингредиентов
}

interface IGetIngredientsFailedAction {
    type: typeof GET_INGREDIENTS_FAILED;
}

interface IClearIngredients {
    type: typeof CLEAR_INGREDIENTS
}

export type TIngredientsActions =
    IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
    | IClearIngredients;

const INGREDIENTS_ENDPOINT = 'ingredients';

export function getIngredients() {
    return function (dispatch: Dispatch<TIngredientsActions>) {
        dispatch({type: GET_INGREDIENTS_REQUEST})
        request<{ data: ReadonlyArray<IIngredient> }>(INGREDIENTS_ENDPOINT)
            .then(result => {
                dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients: [...result.data]})
            })
            .catch(error => {
                console.error(error);
                dispatch({type: GET_INGREDIENTS_FAILED})
            });
    }
}