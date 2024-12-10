import {LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, LogoutActions} from "../../actions/security/logout";

type TInitialState = {
    logoutRequest: boolean,
    logoutFailed: boolean
}

const initialState: TInitialState = {
    logoutRequest: false,
    logoutFailed: false,
};

export const logoutReducer = (state = initialState, action: LogoutActions) => {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return {...state, logoutRequest: true};
        case LOGOUT_SUCCESS:
            return {...state, logoutFailed: false, logoutRequest: false};
        case LOGOUT_FAILED:
            return {...state, logoutFailed: true, logoutRequest: false};
        default:
            return state;
    }
};