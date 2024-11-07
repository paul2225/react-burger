export const GET_CREATED_ORDER_FAILED = 'GET_CREATED_ORDER_FAILED';
export const GET_CREATED_ORDER_REQUEST = 'GET_CREATED_ORDER_REQUEST';
export const GET_CREATED_ORDER_SUCCESS = 'GET_CREATED_ORDER_SUCCESS';
export const CLEAR_CREATED_ORDER = 'CLEAR_CREATED_ORDER';

const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

export function getCreatedOrder(ingredients) {
    return function (dispatch) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: GET_CREATED_ORDER_REQUEST})
        fetch(ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ingredients: ingredients}),
            signal
        })
            .then(result => {
                if (result.ok) {
                    return result.json()
                }

                return Promise.reject(result.status);
            })
            .then(result => {
                clearTimeout(timeoutId);
                dispatch({type: GET_CREATED_ORDER_SUCCESS, order: result})
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.error("Order request timed out")
                }

                dispatch({type: GET_CREATED_ORDER_FAILED})
            });
    }
}