import {
    GET_USER_INFO_FAILED,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GetUserInfoActions
} from "../../actions/profile/getUserInfo";
import {IUserInfo} from "../../../types/IUserInfo";

type TInitialState = {
    getUserInformationRequest: boolean,
    getUserInformationFailed: boolean,
    userInfo: IUserInfo
}

const initialState: TInitialState = {
    getUserInformationRequest: false,
    getUserInformationFailed: false,
    userInfo: {
        name: '',
        email: '',
    }
};

export const getUserInfoReducer = (state = initialState, action: GetUserInfoActions) => {
    switch (action.type) {
        case GET_USER_INFO_REQUEST: {
            return {
                ...state,
                getUserInformationRequest: true
            };
        }
        case GET_USER_INFO_SUCCESS: {
            return {
                ...state,
                getUserInformationFailed: false,
                getUserInformationRequest: false,
                userInfo: action.userInfo
            };
        }
        case GET_USER_INFO_FAILED: {
            return {...state, getUserInformationFailed: true, getUserInformationRequest: false};
        }
        default: {
            return state;
        }
    }
};