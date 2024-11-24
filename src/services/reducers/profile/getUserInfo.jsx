import {
    GET_USER_INFO_FAILED,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS
} from "../../actions/profile/getUserInfo";


const initialState = {
    getUserInformationRequest: false,
    getUserInformationFailed: false,
    userInfo: {
        name: '',
        email: '',
    }
};

export const getUserInfoReducer = (state = initialState, action) => {
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