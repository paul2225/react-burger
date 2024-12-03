import {LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS} from "../../actions/security/logout";


const initialState = {
    logoutRequest: false,
    logoutFailed: false,
};

export const logoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_REQUEST: return {...state, logoutRequest: true};
        case LOGOUT_SUCCESS: return {...state, logoutFailed: false, logoutRequest: false};
        case LOGOUT_FAILED: return {...state, logoutFailed: true, logoutRequest: false};
        default: return state;
    }
};