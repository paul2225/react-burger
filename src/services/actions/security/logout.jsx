import {BASE_API_URL, request} from "../../../utils/request";
import Cookies from 'js-cookie';

export const LOGOUT_FAILED = 'LOGIN_FAILED';
export const LOGOUT_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_SUCCESS = 'LOGIN_SUCCESS';

const LOGOUT_URL = BASE_API_URL + '/auth/logout';

export const logout = () => {
    return async function (dispatch) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: LOGOUT_REQUEST})

        return await request(LOGOUT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('accessToken')
            },
            body: JSON.stringify({
                token: Cookies.get('refreshToken')
            }),
            signal
        }).then(result => {
            clearTimeout(timeoutId);
            Cookies.remove('refreshToken')
            Cookies.remove('accessToken')
            dispatch({type: LOGOUT_SUCCESS})
            return !!result.success;
        }).catch(error => {
            if (error.name === 'AbortError') {
                console.error("Order request timed out")
            }

            dispatch({type: LOGOUT_FAILED})
            return false;
        });
    }
}