import {BASE_API_URL, request} from "../../../utils/request";

export const GET_CREATED_ORDER_FAILED = 'GET_CREATED_ORDER_FAILED';
export const GET_CREATED_ORDER_REQUEST = 'GET_CREATED_ORDER_REQUEST';
export const GET_CREATED_ORDER_SUCCESS = 'GET_CREATED_ORDER_SUCCESS';
export const CLEAR_CREATED_ORDER = 'CLEAR_CREATED_ORDER';

const ORDER_URL = BASE_API_URL + '/orders';

export function getCreatedOrder(ingredients) {
    return function (dispatch) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: GET_CREATED_ORDER_REQUEST})
        request(ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ingredients: ingredients}),
            signal
        }).then(result => {
            clearTimeout(timeoutId);
            dispatch({type: GET_CREATED_ORDER_SUCCESS, order: result})
        }).catch(error => {
            if (error.name === 'AbortError') {
                console.error("Order request timed out")
            }

            dispatch({type: GET_CREATED_ORDER_FAILED})
        });
    }
}