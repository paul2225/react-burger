import {LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LoginActions} from "../../actions/security/login";

type TInitialState = {
    loginRequest: boolean,
    loginFailed: boolean,
}

const initialState: TInitialState = {
    loginRequest: false,
    loginFailed: false,
};

export const loginReducer = (state = initialState, action: LoginActions) => {
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