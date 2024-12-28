import {TWSStoreActions} from "../../../types/ws";

export const ORDERS_FEED_WS_CONNECTION_START: 'ORDERS_FEED_WS_CONNECTION_START' = 'ORDERS_FEED_WS_CONNECTION_START';
export const ORDERS_FEED_WS_CONNECTION_SUCCESS: 'ORDERS_FEED_WS_CONNECTION_SUCCESS' = 'ORDERS_FEED_WS_CONNECTION_SUCCESS';
export const ORDERS_FEED_WS_CONNECTION_ERROR: 'ORDERS_FEED_WS_CONNECTION_ERROR' = 'ORDERS_FEED_WS_CONNECTION_ERROR';
export const ORDERS_FEED_WS_CONNECTION_CLOSED: 'ORDERS_FEED_WS_CONNECTION_CLOSED' = 'ORDERS_FEED_WS_CONNECTION_CLOSED';
export const ORDERS_FEED_WS_GET_MESSAGE: 'ORDERS_FEED_WS_GET_MESSAGE' = 'ORDERS_FEED_WS_GET_MESSAGE';
export const ORDERS_FEED_WS_SEND_MESSAGE: 'ORDERS_FEED_WS_SEND_MESSAGE' = 'ORDERS_FEED_WS_SEND_MESSAGE';

interface IOrdersFeedWSConnectionStartAction {
    type: typeof ORDERS_FEED_WS_CONNECTION_START;
    token?: string;
}

interface IOrdersFeedWSConnectionSuccessAction {
    type: typeof ORDERS_FEED_WS_CONNECTION_SUCCESS;
}

interface IOrdersFeedWSConnectionErrorAction {
    type: typeof ORDERS_FEED_WS_CONNECTION_ERROR;
    payload: Event;
}

interface IOrdersFeedWSConnectionClosedAction {
    type: typeof ORDERS_FEED_WS_CONNECTION_CLOSED;
}

interface IOrdersFeedWSGetMessageAction {
    type: typeof ORDERS_FEED_WS_GET_MESSAGE;
    payload: any;
}

interface IOrdersFeedWSSendMessageAction {
    type: typeof ORDERS_FEED_WS_SEND_MESSAGE;
    payload: any;
}

export type TOrdersFeedWSActions =
    IOrdersFeedWSConnectionStartAction
    | IOrdersFeedWSConnectionSuccessAction
    | IOrdersFeedWSConnectionErrorAction
    | IOrdersFeedWSConnectionClosedAction
    | IOrdersFeedWSGetMessageAction
    | IOrdersFeedWSSendMessageAction

export const feedWSStoreActions: TWSStoreActions = {
    connectionStart: ORDERS_FEED_WS_CONNECTION_START,
    connectionSuccess: ORDERS_FEED_WS_CONNECTION_SUCCESS,
    connectionError: ORDERS_FEED_WS_CONNECTION_ERROR,
    connectionClosed: ORDERS_FEED_WS_CONNECTION_CLOSED,
    getMessage: ORDERS_FEED_WS_GET_MESSAGE,
    sendMessage: ORDERS_FEED_WS_SEND_MESSAGE
};