import {logoutReducer} from "./logout";
import {LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS} from "../../actions/security/logout";


const reducer = logoutReducer;

describe("Logout reducer", () => {
    it("Logout request", () => {
        expect(
            reducer(
                undefined,
                {type: LOGOUT_REQUEST}
            )
        ).toEqual({
            logoutRequest: true,
            logoutFailed: false,
        });
    });

    it("Logout request success", () => {
        expect(
            reducer(
                undefined,
                {type: LOGOUT_SUCCESS}
            )
        ).toEqual({
            logoutRequest: false,
            logoutFailed: false,
        });
    });

    it("Logout request failed", () => {
        expect(
            reducer(
                undefined,
                {type: LOGOUT_FAILED}
            )
        ).toEqual({
            logoutRequest: false,
            logoutFailed: true,
        });
    });
});