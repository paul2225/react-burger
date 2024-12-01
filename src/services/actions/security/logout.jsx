import {requestWithAuth} from "../../../utils/requests";
import Cookies from 'js-cookie';

export const LOGOUT_FAILED = 'LOGIN_FAILED';
export const LOGOUT_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_SUCCESS = 'LOGIN_SUCCESS';

const LOGOUT_ENDPOINT = 'auth/logout';

export const logout = () => {
    return async function (dispatch) {
        dispatch({type: LOGOUT_REQUEST})

        return await requestWithAuth(LOGOUT_ENDPOINT, 'POST', {token: Cookies.get('refreshToken')})
            .then(result => {
                Cookies.remove('refreshToken')
                Cookies.remove('accessToken')
                dispatch({type: LOGOUT_SUCCESS})
                return !!result.success;
            }).catch(error => {
                console.error(error)
                dispatch({type: LOGOUT_FAILED})
                return false;
            });
    }
}