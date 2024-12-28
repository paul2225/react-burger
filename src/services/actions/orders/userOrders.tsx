import {TWSStoreActions} from "../../../types/ws";

export const USER_ORDERS_FEED_WS_CONNECTION_START: 'USER_ORDERS_FEED_WS_CONNECTION_START' = 'USER_ORDERS_FEED_WS_CONNECTION_START';
export const USER_ORDERS_FEED_WS_CONNECTION_SUCCESS: 'USER_ORDERS_FEED_WS_CONNECTION_SUCCESS' = 'USER_ORDERS_FEED_WS_CONNECTION_SUCCESS';
export const USER_ORDERS_FEED_WS_CONNECTION_ERROR: 'USER_ORDERS_FEED_WS_CONNECTION_ERROR' = 'USER_ORDERS_FEED_WS_CONNECTION_ERROR';
export const USER_ORDERS_FEED_WS_CONNECTION_CLOSED: 'USER_ORDERS_FEED_WS_CONNECTION_CLOSED' = 'USER_ORDERS_FEED_WS_CONNECTION_CLOSED';
export const USER_ORDERS_FEED_WS_GET_MESSAGE: 'USER_ORDERS_FEED_WS_GET_MESSAGE' = 'USER_ORDERS_FEED_WS_GET_MESSAGE';
export const USER_ORDERS_FEED_WS_SEND_MESSAGE: 'USER_ORDERS_FEED_WS_SEND_MESSAGE' = 'USER_ORDERS_FEED_WS_SEND_MESSAGE';

interface IUserOrdersFeedWSConnectionStartAction {
    type: typeof USER_ORDERS_FEED_WS_CONNECTION_START;
    token?: string;
}

interface IUserOrdersFeedWSConnectionSuccessAction {
    type: typeof USER_ORDERS_FEED_WS_CONNECTION_SUCCESS;
}

interface IUserOrdersFeedWSConnectionErrorAction {
    type: typeof USER_ORDERS_FEED_WS_CONNECTION_ERROR;
    payload: Event;
}

interface IUserOrdersFeedWSConnectionClosedAction {
    type: typeof USER_ORDERS_FEED_WS_CONNECTION_CLOSED;
}

interface IUserOrdersFeedWSGetMessageAction {
    type: typeof USER_ORDERS_FEED_WS_GET_MESSAGE;
    payload: any;
}

interface IUserOrdersFeedWSSendMessageAction {
    type: typeof USER_ORDERS_FEED_WS_SEND_MESSAGE;
    payload: any;
}

export type TUserOrdersFeedWSActions =
    IUserOrdersFeedWSConnectionStartAction
    | IUserOrdersFeedWSConnectionSuccessAction
    | IUserOrdersFeedWSConnectionErrorAction
    | IUserOrdersFeedWSConnectionClosedAction
    | IUserOrdersFeedWSGetMessageAction
    | IUserOrdersFeedWSSendMessageAction

export const userOrdersStoreActions: TWSStoreActions = {
    connectionStart: USER_ORDERS_FEED_WS_CONNECTION_START,
    connectionSuccess: USER_ORDERS_FEED_WS_CONNECTION_SUCCESS,
    connectionError: USER_ORDERS_FEED_WS_CONNECTION_ERROR,
    connectionClosed: USER_ORDERS_FEED_WS_CONNECTION_CLOSED,
    getMessage: USER_ORDERS_FEED_WS_GET_MESSAGE,
    sendMessage: USER_ORDERS_FEED_WS_SEND_MESSAGE
};