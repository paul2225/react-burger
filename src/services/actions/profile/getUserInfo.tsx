import {requestWithAuth} from "../../../utils/requests";
import {Dispatch} from "redux";
import {IUserInfo} from "../../../types/IUserInfo";

export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';
export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';

interface GetUserInfoFailedAction {
    type: typeof GET_USER_INFO_FAILED;
}

interface GetUserInfoRequestAction {
    type: typeof GET_USER_INFO_REQUEST;
}

interface GetUserInfoSuccessAction {
    type: typeof GET_USER_INFO_SUCCESS;
    userInfo: IUserInfo
}

export type GetUserInfoActions = GetUserInfoFailedAction | GetUserInfoRequestAction | GetUserInfoSuccessAction

const GET_USER_INFORMATION_ENDPOINT = 'auth/user';

export const getUserInfo = () => {
    return async function (dispatch: Dispatch<GetUserInfoActions>) {
        dispatch({type: GET_USER_INFO_REQUEST})
        return requestWithAuth(GET_USER_INFORMATION_ENDPOINT, 'GET')
            .then(result => {
                if (result.success) {
                    dispatch({type: GET_USER_INFO_SUCCESS, userInfo: result.user})
                }
            }).catch(error => {
                console.error(error)
                dispatch({type: GET_USER_INFO_FAILED})
                return false;
            });
    }
}