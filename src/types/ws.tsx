import {
    ORDERS_FEED_WS_CONNECTION_CLOSED,
    ORDERS_FEED_WS_CONNECTION_ERROR,
    ORDERS_FEED_WS_CONNECTION_START,
    ORDERS_FEED_WS_CONNECTION_SUCCESS,
    ORDERS_FEED_WS_GET_MESSAGE,
    ORDERS_FEED_WS_SEND_MESSAGE
} from "../services/actions/orders/ordersFeed";
import {
    USER_ORDERS_FEED_WS_CONNECTION_CLOSED,
    USER_ORDERS_FEED_WS_CONNECTION_ERROR,
    USER_ORDERS_FEED_WS_CONNECTION_START,
    USER_ORDERS_FEED_WS_CONNECTION_SUCCESS,
    USER_ORDERS_FEED_WS_GET_MESSAGE,
    USER_ORDERS_FEED_WS_SEND_MESSAGE
} from "../services/actions/orders/userOrders";

export type TWSStoreActions = {
    connectionStart: typeof ORDERS_FEED_WS_CONNECTION_START | typeof USER_ORDERS_FEED_WS_CONNECTION_START,
    connectionSuccess: typeof ORDERS_FEED_WS_CONNECTION_SUCCESS | typeof USER_ORDERS_FEED_WS_CONNECTION_SUCCESS,
    connectionError: typeof ORDERS_FEED_WS_CONNECTION_ERROR | typeof USER_ORDERS_FEED_WS_CONNECTION_ERROR,
    connectionClosed: typeof ORDERS_FEED_WS_CONNECTION_CLOSED | typeof USER_ORDERS_FEED_WS_CONNECTION_CLOSED,
    getMessage: typeof ORDERS_FEED_WS_GET_MESSAGE | typeof USER_ORDERS_FEED_WS_GET_MESSAGE,
    sendMessage: typeof ORDERS_FEED_WS_SEND_MESSAGE | typeof USER_ORDERS_FEED_WS_SEND_MESSAGE
}