import type {Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState} from "../index";
import {TOrdersFeedWSActions} from "../services/actions/orders/ordersFeed";
import {TWSStoreActions} from "../types/ws";
import {TUserOrdersFeedWSActions} from "../services/actions/orders/userOrders";
import Cookies from "js-cookie";

export const socketMiddleware = (wsUrl: string, actions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimeout: NodeJS.Timeout | null = null;

        function connect(): WebSocket {
            const trimmedToken = Cookies.get('accessToken')?.replace('Bearer', '').trim();
            return new WebSocket(wsUrl + (trimmedToken !== undefined ? '?token=' + trimmedToken : ''));
        }

        function closeSocket() {
            if (socket) {
                socket.close();
                socket = null;
            }

            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout);
                reconnectTimeout = null;
            }
        }

        return next => (action: TOrdersFeedWSActions | TUserOrdersFeedWSActions) => {
            const {dispatch} = store;
            const {type} = action;
            isConnected = true;

            if (type === actions.connectionStart) {
                socket = connect();
            }

            if (socket) {
                socket.onopen = event => dispatch({type: actions.connectionSuccess});
                socket.onerror = event => dispatch({type: actions.connectionError, payload: event});
                socket.onmessage = event => dispatch({type: actions.getMessage, payload: JSON.parse(event.data)});
                socket.onclose = event => {
                    socket = null;
                    dispatch({type: actions.connectionClosed});

                    if (isConnected) {
                        reconnectTimeout = setTimeout(() => connect(), 3000);
                    }
                }

                if (type === actions.sendMessage) {
                    socket.send(JSON.stringify(action.payload));
                } else if (type === actions.connectionClosed) {
                    closeSocket();
                    isConnected = false;
                }
            }

            next(action);
        };
    }) as Middleware;
};