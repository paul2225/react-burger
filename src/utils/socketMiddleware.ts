import type {Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState} from "../index";
import {TOrdersFeedWSActions} from "../services/actions/orders/ordersFeed";
import {TWSStoreActions} from "../types/ws";
import {TUserOrdersFeedWSActions} from "../services/actions/orders/userOrders";
import Cookies from "js-cookie";

export const socketMiddleware = (wsUrl: string, actions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TOrdersFeedWSActions | TUserOrdersFeedWSActions) => {
            const {dispatch} = store;
            const {type} = action;

            if (type === actions.connectionStart) {
                const trimmedToken = Cookies.get('accessToken')?.replace('Bearer', '').trim();
                socket = new WebSocket(wsUrl + (trimmedToken !== undefined ? '?token=' + trimmedToken : ''));
            }

            if (socket) {
                socket.onopen = event => dispatch({type: actions.connectionSuccess});
                socket.onerror = event => dispatch({type: actions.connectionError, payload: event});
                socket.onmessage = event => dispatch({type: actions.getMessage, payload: JSON.parse(event.data)});
                socket.onclose = event => dispatch({type: actions.connectionClosed});

                if (type === actions.sendMessage) {
                    socket.send(JSON.stringify(action.payload));
                }
            }

            next(action);
        };
    }) as Middleware;
};