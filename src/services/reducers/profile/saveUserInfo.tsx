import {
    SAVE_USER_INFO_FAILED,
    SAVE_USER_INFO_REQUEST,
    SAVE_USER_INFO_SUCCESS,
    TSaveUserInfoActions
} from "../../actions/profile/saveUserInfo";

type TSaveUserInfoState = {
    saveUserInfoRequest: boolean,
    saveUserInfoFailed: boolean
}

const initialState: TSaveUserInfoState = {
    saveUserInfoRequest: false,
    saveUserInfoFailed: false,
};

export const saveUserInfoReducer = (state = initialState, action: TSaveUserInfoActions): TSaveUserInfoState => {
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