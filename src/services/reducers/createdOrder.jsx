import {
    CLEAR_CREATED_ORDER,
    GET_CREATED_ORDER_FAILED,
    GET_CREATED_ORDER_REQUEST,
    GET_CREATED_ORDER_SUCCESS
} from "../actions/createdOrder";


const initialState = {
    order: null,
    createdOrderRequest: false,
    createdOrderFailed: false,
};

export const createdOrderReducer = (state = initialState, action) => {
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
            return {...state, order: null};
        }
        default: {
            return state;
        }
    }
};