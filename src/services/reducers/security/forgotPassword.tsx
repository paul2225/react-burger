import {
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    TForgotPasswordActions
} from "../../actions/security/forgotPassword";

type TForgotPasswordState = {
    forgotPasswordRequest: boolean,
    forgotPasswordFailed: boolean
}

const initialState: TForgotPasswordState = {
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
};

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordActions): TForgotPasswordState => {
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