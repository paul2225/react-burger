import {
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    TResetPasswordActions
} from "../../actions/security/resetPassword";

type TResetPasswordState = {
    resetPasswordRequest: boolean,
    resetPasswordFailed: boolean
}

const initialState: TResetPasswordState = {
    resetPasswordRequest: false,
    resetPasswordFailed: false,
};

export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions): TResetPasswordState => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordFailed: false,
                resetPasswordRequest: false
            };
        }
        case RESET_PASSWORD_FAILED: {
            return {...state, resetPasswordFailed: true, resetPasswordRequest: false};
        }
        default: {
            return state;
        }
    }
};