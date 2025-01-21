import {getUserInfoReducer} from "./getUserInfo";
import {GET_USER_INFO_FAILED, GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS} from "../../actions/profile/getUserInfo";


const reducer = getUserInfoReducer;

describe("User info reducer", () => {
    it("Get user info request", () => {
        expect(
            reducer(
                undefined,
                {type: GET_USER_INFO_REQUEST}
            )
        ).toEqual({
            getUserInformationRequest: true,
            getUserInformationFailed: false,
            userInfo: {
                name: '',
                email: '',
            }
        });
    });

    it("Get user info success", () => {
        expect(
            reducer(
                undefined,
                {type: GET_USER_INFO_SUCCESS, userInfo: {name: 'name', email: 'email'}}
            )
        ).toEqual({
            getUserInformationRequest: false,
            getUserInformationFailed: false,
            userInfo: {
                name: 'name',
                email: 'email',
            }
        });
    });

    it("Get user info failed", () => {
        expect(
            reducer(
                undefined,
                {type: GET_USER_INFO_FAILED}
            )
        ).toEqual({
            getUserInformationRequest: false,
            getUserInformationFailed: true,
            userInfo: {
                name: '',
                email: '',
            }
        });
    });
});