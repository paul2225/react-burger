import {saveUserInfoReducer} from "./saveUserInfo";
import {
    SAVE_USER_INFO_FAILED,
    SAVE_USER_INFO_REQUEST,
    SAVE_USER_INFO_SUCCESS
} from "../../actions/profile/saveUserInfo";


const reducer = saveUserInfoReducer;

describe("Save user info reducer", () => {
    it("Save user info request", () => {
        expect(
            reducer(
                undefined,
                {type: SAVE_USER_INFO_REQUEST}
            )
        ).toEqual({
            saveUserInfoRequest: true,
            saveUserInfoFailed: false,
        });
    });

    it("Save user info success", () => {
        expect(
            reducer(
                undefined,
                {type: SAVE_USER_INFO_SUCCESS}
            )
        ).toEqual({
            saveUserInfoFailed: false,
            saveUserInfoRequest: false
        });
    });

    it("Save user info failed", () => {
        expect(
            reducer(
                undefined,
                {type: SAVE_USER_INFO_FAILED}
            )
        ).toEqual({
            saveUserInfoFailed: true,
            saveUserInfoRequest: false
        });
    });
});