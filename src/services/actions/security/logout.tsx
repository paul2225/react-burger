import {requestWithAuth} from "../../../utils/requests";
import Cookies from 'js-cookie';
import {Dispatch} from "redux";

export const LOGOUT_FAILED = 'LOGIN_FAILED';
export const LOGOUT_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_SUCCESS = 'LOGIN_SUCCESS';

interface LogoutFailedAction {
    type: typeof LOGOUT_FAILED;
}

interface LogoutRequestAction {
    type: typeof LOGOUT_REQUEST;
}

interface LogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
}

export type LogoutActions = LogoutFailedAction | LogoutRequestAction | LogoutSuccessAction;

const LOGOUT_ENDPOINT = 'auth/logout';

export const logout = () => {
    return async function (dispatch: Dispatch<LogoutActions>) {
        dispatch({type: LOGOUT_REQUEST})

        return await requestWithAuth(LOGOUT_ENDPOINT, 'POST', {token: Cookies.get('refreshToken')})
            .then(result => {
                Cookies.remove('refreshToken')
                Cookies.remove('accessToken')
                dispatch({type: LOGOUT_SUCCESS})
                return result.success;
            }).catch(error => {
                console.error(error)
                dispatch({type: LOGOUT_FAILED})
                return false;
            });
    }
}