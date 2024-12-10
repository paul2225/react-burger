import {request} from "../../../utils/requests";
import {Dispatch} from "redux";
import {IIngredient} from "../../../types/IIngredient";

export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

interface GetIngredientsRequestAction {
    type: typeof GET_INGREDIENTS_REQUEST;
}

interface GetIngredientsSuccessAction {
    type: typeof GET_INGREDIENTS_SUCCESS;
    ingredients: ReadonlyArray<IIngredient>;
}

interface GetIngredientsFailedAction {
    type: typeof GET_INGREDIENTS_FAILED;
}

type IngredientsActions = GetIngredientsRequestAction | GetIngredientsSuccessAction | GetIngredientsFailedAction

const INGREDIENTS_ENDPOINT = 'ingredients';

export function getIngredients() {
    return function (dispatch: Dispatch<IngredientsActions>) {
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