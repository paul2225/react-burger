import {request} from "../../../utils/requests";
import {CLEAR_CONSTRUCTOR_INGREDIENT, TConstructorIngredientsActions} from "./constructorIngredients";
import {Dispatch} from "redux";
import {IOrder} from "../../../types/IOrder";

export const GET_CREATED_ORDER_FAILED: 'GET_CREATED_ORDER_FAILED' = 'GET_CREATED_ORDER_FAILED';
export const GET_CREATED_ORDER_REQUEST: 'GET_CREATED_ORDER_REQUEST' = 'GET_CREATED_ORDER_REQUEST';
export const GET_CREATED_ORDER_SUCCESS: 'GET_CREATED_ORDER_SUCCESS' = 'GET_CREATED_ORDER_SUCCESS';
export const CLEAR_CREATED_ORDER: 'CLEAR_CREATED_ORDER' = 'CLEAR_CREATED_ORDER';

interface IGetCreatedOrderFailedAction {
    type: typeof GET_CREATED_ORDER_FAILED;
}

interface IGetCreatedOrderRequestAction {
    type: typeof GET_CREATED_ORDER_REQUEST;
}

interface IGetCreatedOrderSuccessAction {
    type: typeof GET_CREATED_ORDER_SUCCESS;
    order: IOrder
}

interface IClearCreatedOrderAction {
    type: typeof CLEAR_CREATED_ORDER;
}

export type TCreatedOrderActions =
    IGetCreatedOrderFailedAction
    | IGetCreatedOrderRequestAction
    | IGetCreatedOrderSuccessAction
    | IClearCreatedOrderAction

const ORDER_ENDPOINT = 'orders';

export function getCreatedOrder(ingredients: ReadonlyArray<string>) {
    return function (dispatch: Dispatch<TCreatedOrderActions | TConstructorIngredientsActions>) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: GET_CREATED_ORDER_REQUEST})
        request<IOrder>(ORDER_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ingredients: ingredients}),
            signal
        }).then(result => {
            clearTimeout(timeoutId);
            dispatch({type: CLEAR_CONSTRUCTOR_INGREDIENT});
            dispatch({type: GET_CREATED_ORDER_SUCCESS, order: result})
        }).catch(error => {
            if (error.name === 'AbortError') {
                console.error("Order request timed out")
            }

            dispatch({type: GET_CREATED_ORDER_FAILED})
        });
    }
}