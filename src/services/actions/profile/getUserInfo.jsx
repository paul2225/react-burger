import {requestWithAuth} from "../../../utils/requests";

export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';
export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';

const GET_USER_INFORMATION_ENDPOINT = 'auth/user';

export const getUserInfo = () => {
    return async function (dispatch) {
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