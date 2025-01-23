import {mock} from "ts-mockito";
import {userOrdersFeedReducer} from "./userOrders";
import {
    USER_ORDERS_FEED_WS_CONNECTION_CLOSED,
    USER_ORDERS_FEED_WS_CONNECTION_ERROR,
    USER_ORDERS_FEED_WS_CONNECTION_SUCCESS,
    USER_ORDERS_FEED_WS_GET_MESSAGE
} from "../../actions/orders/userOrders";


const reducer = userOrdersFeedReducer;

describe("User orders feed reducer", () => {
    it("User orders feed ws connection success", () => {
        expect(
            reducer(
                undefined,
                {type: USER_ORDERS_FEED_WS_CONNECTION_SUCCESS}
            )
        ).toEqual({
            wsConnected: true,
            orders: {
                orders: [],
                total: 0,
                totalToday: 0,
            },
        });
    });

    it("User orders feed ws connection error", () => {
        expect(
            reducer(
                undefined,
                {type: USER_ORDERS_FEED_WS_CONNECTION_ERROR, payload: mock<Event>()}
            )
        ).toEqual({
            wsConnected: false,
            orders: {
                orders: [],
                total: 0,
                totalToday: 0,
            },
        });
    });

    it("User orders feed ws connection closed", () => {
        expect(
            reducer(
                undefined,
                {type: USER_ORDERS_FEED_WS_CONNECTION_CLOSED}
            )
        ).toEqual({
            wsConnected: false,
            orders: {
                orders: [],
                total: 0,
                totalToday: 0,
            },
        });
    });

    it("User orders feed ws get message", () => {
        expect(
            reducer(
                undefined,
                {type: USER_ORDERS_FEED_WS_GET_MESSAGE, payload: {success: true, test: "test"}}
            )
        ).toEqual({
            wsConnected: false,
            orders: {success: true, test: "test"},
        });
    });
});