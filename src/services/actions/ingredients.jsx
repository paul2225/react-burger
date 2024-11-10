import {BASE_API_URL, request} from "../../utils/request";

export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

const INGREDIENTS_URL = BASE_API_URL + '/ingredients';

export function getIngredients() {
    return function (dispatch) {
        dispatch({type: GET_INGREDIENTS_REQUEST})
        request(INGREDIENTS_URL)
            .then(result => {
                dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients: [...result.data]})
            })
            .catch(error => {
                console.error(error);
                dispatch({type: GET_INGREDIENTS_FAILED})
            });
    }
}