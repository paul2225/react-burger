import {LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, TLoginActions} from "../../actions/security/login";

type TLoginState = {
    loginRequest: boolean,
    loginFailed: boolean,
}

const initialState: TLoginState = {
    loginRequest: false,
    loginFailed: false,
};

export const loginReducer = (state = initialState, action: TLoginActions): TLoginState => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {...state, loginRequest: true};
        case LOGIN_SUCCESS:
            return {...state, loginFailed: false, loginRequest: false};
        case LOGIN_FAILED:
            return {...state, loginFailed: true, loginRequest: false};
        default:
            return state;
    }
};