import {resetPasswordReducer} from "./resetPassword";
import {
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
} from "../../actions/security/resetPassword";


const reducer = resetPasswordReducer;

describe("Reset password reducer", () => {
    it("Reset password request", () => {
        expect(
            reducer(
                undefined,
                {type: RESET_PASSWORD_REQUEST}
            )
        ).toEqual({
            resetPasswordFailed: false,
            resetPasswordRequest: true
        });
    });

    it("Reset password request success", () => {
        expect(
            reducer(
                undefined,
                {type: RESET_PASSWORD_SUCCESS}
            )
        ).toEqual({
            resetPasswordFailed: false,
            resetPasswordRequest: false
        });
    });

    it("Reset password request failed", () => {
        expect(
            reducer(
                undefined,
                {type: RESET_PASSWORD_FAILED}
            )
        ).toEqual({
            resetPasswordFailed: true,
            resetPasswordRequest: false
        });
    });
});