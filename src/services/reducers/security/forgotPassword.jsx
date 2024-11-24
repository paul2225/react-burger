import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED
} from "../../actions/security/forgotPassword";


const initialState = {
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
};

export const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordFailed: false,
                forgotPasswordRequest: false
            };
        }
        case FORGOT_PASSWORD_FAILED: {
            return {...state, forgotPasswordFailed: true, forgotPasswordRequest: false};
        }
        default: {
            return state;
        }
    }
};