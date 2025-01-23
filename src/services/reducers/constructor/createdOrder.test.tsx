import {createdOrderReducer} from "./createdOrder";
import {
    CLEAR_CREATED_ORDER,
    GET_CREATED_ORDER_FAILED,
    GET_CREATED_ORDER_REQUEST,
    GET_CREATED_ORDER_SUCCESS
} from "../../actions/constructor/createdOrder";
import {TEST_ORDER} from "../../../utils/testUtils";

const reducer = createdOrderReducer;

describe("Constructor ingredients reducer", () => {
    it("Test initial state", () => {
        expect(
            reducer(
                undefined,
                {type: CLEAR_CREATED_ORDER}
            )
        ).toEqual({
            order: null,
            createdOrderRequest: false,
            createdOrderFailed: false,
        });
    });

    it("Get created order request", () => {
        expect(
            reducer(
                undefined,
                {type: GET_CREATED_ORDER_REQUEST}
            )
        ).toEqual({
            order: null,
            createdOrderRequest: true,
            createdOrderFailed: false,
        });
    });

    it("Get created order success", () => {
        expect(
            reducer(
                undefined,
                {type: GET_CREATED_ORDER_SUCCESS, order: TEST_ORDER}
            )
        ).toEqual({
            order: TEST_ORDER,
            createdOrderRequest: false,
            createdOrderFailed: false,
        });
    });

    it("Get created order failed", () => {
        expect(
            reducer(
                undefined,
                {type: GET_CREATED_ORDER_FAILED}
            )
        ).toEqual({
            order: null,
            createdOrderRequest: false,
            createdOrderFailed: true,
        });
    });

    it("Clear created order", () => {
        expect(
            reducer(
                {
                    order: TEST_ORDER,
                    createdOrderRequest: false,
                    createdOrderFailed: false
                },
                {type: CLEAR_CREATED_ORDER}
            )
        ).toEqual({
            order: null,
            createdOrderRequest: false,
            createdOrderFailed: false,
        });
    });
});