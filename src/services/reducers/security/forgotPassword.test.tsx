import {forgotPasswordReducer} from "./forgotPassword";
import {
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS
} from "../../actions/security/forgotPassword";


const reducer = forgotPasswordReducer;

describe("Forgot password reducer", () => {
    it("Save user info request", () => {
        expect(
            reducer(
                undefined,
                {type: FORGOT_PASSWORD_REQUEST}
            )
        ).toEqual({
            forgotPasswordFailed: false,
            forgotPasswordRequest: true
        });
    });

    it("Forgot password success", () => {
        expect(
            reducer(
                undefined,
                {type: FORGOT_PASSWORD_SUCCESS}
            )
        ).toEqual({
            forgotPasswordFailed: false,
            forgotPasswordRequest: false
        });
    });

    it("Forgot password failed", () => {
        expect(
            reducer(
                undefined,
                {type: FORGOT_PASSWORD_FAILED}
            )
        ).toEqual({
            forgotPasswordFailed: true,
            forgotPasswordRequest: false
        });
    });
});