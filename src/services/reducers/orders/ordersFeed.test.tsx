import {ordersFeedReducer} from "./ordersFeed";
import {
    ORDERS_FEED_WS_CONNECTION_ERROR,
    ORDERS_FEED_WS_CONNECTION_SUCCESS,
    ORDERS_FEED_WS_GET_MESSAGE
} from "../../actions/orders/ordersFeed";
import {mock} from "ts-mockito";


const reducer = ordersFeedReducer;

describe("Orders feed reducer", () => {
    it("Orders feed ws connection success", () => {
        expect(
            reducer(
                undefined,
                {type: ORDERS_FEED_WS_CONNECTION_SUCCESS}
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

    it("Orders feed ws connection error", () => {
        expect(
            reducer(
                undefined,
                {type: ORDERS_FEED_WS_CONNECTION_ERROR, payload: mock<Event>()}
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

    it("Orders feed ws connection closed", () => {
        expect(
            reducer(
                undefined,
                {type: ORDERS_FEED_WS_CONNECTION_ERROR, payload: mock<Event>()}
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

    it("Orders feed ws get message", () => {
        expect(
            reducer(
                undefined,
                {type: ORDERS_FEED_WS_GET_MESSAGE, payload: {success: true, test: "test"}}
            )
        ).toEqual({
            wsConnected: false,
            orders: {success: true, test: "test"},
        });
    });
});