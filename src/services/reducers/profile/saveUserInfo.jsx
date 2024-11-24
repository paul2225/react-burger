import {SAVE_USER_INFO_FAILED, SAVE_USER_INFO_REQUEST, SAVE_USER_INFO_SUCCESS} from "../../actions/profile/saveUserInfo";


const initialState = {
    saveUserInfoRequest: false,
    saveUserInfoFailed: false,
};

export const saveUserInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER_INFO_REQUEST: {
            return {
                ...state,
                saveUserInfoRequest: true
            };
        }
        case SAVE_USER_INFO_SUCCESS: {
            return {
                ...state,
                saveUserInfoFailed: false,
                saveUserInfoRequest: false
            };
        }
        case SAVE_USER_INFO_FAILED: {
            return {...state, saveUserInfoFailed: true, saveUserInfoRequest: false};
        }
        default: {
            return state;
        }
    }
};