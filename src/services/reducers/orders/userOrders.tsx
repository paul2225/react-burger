import {IFeedOrders} from "../../../types/IOrder";
import {
    TUserOrdersFeedWSActions,
    USER_ORDERS_FEED_WS_CONNECTION_CLOSED,
    USER_ORDERS_FEED_WS_CONNECTION_ERROR,
    USER_ORDERS_FEED_WS_CONNECTION_SUCCESS,
    USER_ORDERS_FEED_WS_GET_MESSAGE
} from "../../actions/orders/userOrders";

type TOrdersFeedState = {
    wsConnected: boolean;
    orders: IFeedOrders;
}

const initialState = {
    wsConnected: false,
    orders: {
        orders: [],
        total: 0,
        totalToday: 0,
    },
};

export const userOrdersFeedReducer = (state: TOrdersFeedState = initialState, action: TUserOrdersFeedWSActions): TOrdersFeedState => {
    switch (action.type) {
        case USER_ORDERS_FEED_WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case USER_ORDERS_FEED_WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case USER_ORDERS_FEED_WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };

        case USER_ORDERS_FEED_WS_GET_MESSAGE:
            if (!action.payload['success']) {
                return state;
            }

            return {
                ...state,
                orders: action.payload
            };
        default:
            return state;
    }
};