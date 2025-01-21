import {REGISTRATION_FAILED, REGISTRATION_REQUEST, REGISTRATION_SUCCESS} from "../../actions/security/registration";
import {registrationReducer} from "./registration";


const reducer = registrationReducer;

describe("Registration reducer", () => {
    it("Registration request", () => {
        expect(
            reducer(
                undefined,
                {type: REGISTRATION_REQUEST}
            )
        ).toEqual({
            registrationFailed: false,
            registrationRequest: true
        });
    });

    it("Registration request success", () => {
        expect(
            reducer(
                undefined,
                {type: REGISTRATION_SUCCESS}
            )
        ).toEqual({
            registrationFailed: false,
            registrationRequest: false
        });
    });

    it("Registration request failed", () => {
        expect(
            reducer(
                undefined,
                {type: REGISTRATION_FAILED}
            )
        ).toEqual({
            registrationFailed: true,
            registrationRequest: false
        });
    });
});