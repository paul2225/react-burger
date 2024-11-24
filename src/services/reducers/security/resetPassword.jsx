import {RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS} from "../../actions/security/resetPassword";


const initialState = {
    resetPasswordRequest: false,
    resetPasswordFailed: false,
};

export const resetPasswordReducer = (state = initialState, action) => {
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