export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

export function getIngredients() {
    return function (dispatch) {
        dispatch({type: GET_INGREDIENTS_REQUEST})
        fetch(INGREDIENTS_URL)
            .then(result => {
                if (result.ok) {
                    return result.json()
                }

                return Promise.reject(result.status);
            })
            .then(result => {
                dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients: [...result.data]})
            })
            .catch(error => {
                console.error(error);
                dispatch({type: GET_INGREDIENTS_FAILED})
            });
    }
}