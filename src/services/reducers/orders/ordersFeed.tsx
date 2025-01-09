import {
    ORDERS_FEED_WS_CONNECTION_CLOSED,
    ORDERS_FEED_WS_CONNECTION_ERROR,
    ORDERS_FEED_WS_CONNECTION_SUCCESS,
    ORDERS_FEED_WS_GET_MESSAGE,
    TOrdersFeedWSActions
} from "../../actions/orders/ordersFeed";
import {IFeedOrders} from "../../../types/IOrder";

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

export const ordersFeedReducer = (state: TOrdersFeedState = initialState, action: TOrdersFeedWSActions): TOrdersFeedState => {
    switch (action.type) {
        case ORDERS_FEED_WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case ORDERS_FEED_WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case ORDERS_FEED_WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };

        case ORDERS_FEED_WS_GET_MESSAGE:
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