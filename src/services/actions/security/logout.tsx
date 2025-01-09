import {requestWithAuth} from "../../../utils/requests";
import Cookies from 'js-cookie';
import {Dispatch} from "redux";

export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';

interface ILogoutFailedAction {
    type: typeof LOGOUT_FAILED;
}

interface ILogoutRequestAction {
    type: typeof LOGOUT_REQUEST;
}

interface ILogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
}

export type TLogoutActions = ILogoutFailedAction | ILogoutRequestAction | ILogoutSuccessAction;

const LOGOUT_ENDPOINT = 'auth/logout';

export const logout = () => {
    return async function (dispatch: Dispatch<TLogoutActions>) {
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