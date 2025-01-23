import {loginReducer} from "./login";
import {LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS} from "../../actions/security/login";


const reducer = loginReducer;

describe("Login reducer", () => {
    it("Login request", () => {
        expect(
            reducer(
                undefined,
                {type: LOGIN_REQUEST}
            )
        ).toEqual({
            loginRequest: true,
            loginFailed: false,
        });
    });

    it("Login request success", () => {
        expect(
            reducer(
                undefined,
                {type: LOGIN_SUCCESS}
            )
        ).toEqual({
            loginRequest: false,
            loginFailed: false,
        });
    });

    it("Login request failed", () => {
        expect(
            reducer(
                undefined,
                {type: LOGIN_FAILED}
            )
        ).toEqual({
            loginRequest: false,
            loginFailed: true,
        });
    });
});