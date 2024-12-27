import {
    GET_USER_INFO_FAILED,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    TGetUserInfoActions
} from "../../actions/profile/getUserInfo";
import {IUserInfo} from "../../../types/IUserInfo";

type TGetUserInfoState = {
    getUserInformationRequest: boolean,
    getUserInformationFailed: boolean,
    userInfo: IUserInfo
}

const initialState: TGetUserInfoState = {
    getUserInformationRequest: false,
    getUserInformationFailed: false,
    userInfo: {
        name: '',
        email: '',
    }
};

export const getUserInfoReducer = (state = initialState, action: TGetUserInfoActions): TGetUserInfoState => {
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