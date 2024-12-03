import {LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS} from "../../actions/security/login";


const initialState = {
    loginRequest: false,
    loginFailed: false,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: return {...state, loginRequest: true};
        case LOGIN_SUCCESS: return {...state, loginFailed: false, loginRequest: false};
        case LOGIN_FAILED: return {...state, loginFailed: true, loginRequest: false};
        default: return state;
    }
};