import {request} from "../../../utils/requests";

export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

const INGREDIENTS_ENDPOINT = 'ingredients';

export function getIngredients() {
    return function (dispatch) {
        dispatch({type: GET_INGREDIENTS_REQUEST})
        request(INGREDIENTS_ENDPOINT)
            .then(result => {
                dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients: [...result.data]})
            })
            .catch(error => {
                console.error(error);
                dispatch({type: GET_INGREDIENTS_FAILED})
            });
    }
}