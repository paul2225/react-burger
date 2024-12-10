import {
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    ForgotPasswordActions
} from "../../actions/security/forgotPassword";

type TInitialState = {
    forgotPasswordRequest: boolean,
    forgotPasswordFailed: boolean
}

const initialState: TInitialState = {
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
};

export const forgotPasswordReducer = (state = initialState, action: ForgotPasswordActions) => {
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