import {
    CLEAR_CREATED_ORDER,
    CreatedOrderActions,
    GET_CREATED_ORDER_FAILED,
    GET_CREATED_ORDER_REQUEST,
    GET_CREATED_ORDER_SUCCESS
} from "../../actions/constructor/createdOrder";
import {IOrder} from "../../../types/IOrder";

type TInitialState = {
    order: IOrder | null,
    createdOrderRequest: boolean,
    createdOrderFailed: false
}

const initialState: TInitialState = {
    order: null,
    createdOrderRequest: false,
    createdOrderFailed: false,
};

export const createdOrderReducer = (state = initialState, action: CreatedOrderActions) => {
    switch (action.type) {
        case GET_CREATED_ORDER_REQUEST: {
            return {
                ...state,
                createdOrderRequest: true
            };
        }
        case GET_CREATED_ORDER_SUCCESS: {
            return {
                ...state,
                createdOrderFailed: false,
                createdOrderRequest: false,
                order: action.order
            };
        }
        case GET_CREATED_ORDER_FAILED: {
            return {...state, createdOrderFailed: true, createdOrderRequest: false};
        }
        case CLEAR_CREATED_ORDER: {
            return {...state, createdOrderFailed: false, createdOrderRequest: false, order: null};
        }
        default: {
            return state;
        }
    }
};