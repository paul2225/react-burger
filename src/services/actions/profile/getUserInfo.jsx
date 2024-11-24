import {BASE_API_URL, request} from "../../../utils/request";
import Cookies from "js-cookie";

export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';
export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';

const GET_USER_INFORMATION_URL = BASE_API_URL + '/auth/user';

export const getUserInfo = () => {
    return async function (dispatch) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: GET_USER_INFO_REQUEST})
        return request(GET_USER_INFORMATION_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('accessToken')
            },
            signal
        }).then(result => {
            clearTimeout(timeoutId);

            if (result.success) {
                dispatch({type: GET_USER_INFO_SUCCESS, userInfo: result.user})
            }
        }).catch(error => {
            if (error.name === 'AbortError') {
                console.error("Order request timed out")
            }

            console.error(error)

            dispatch({type: GET_USER_INFO_FAILED})
            return false;
        });
    }
}