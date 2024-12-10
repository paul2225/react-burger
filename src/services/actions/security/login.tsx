import {request} from "../../../utils/requests";
import Cookies from 'js-cookie';
import {Dispatch} from "redux";

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

interface LoginFailedAction {
    type: typeof LOGIN_FAILED
}

interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
}

export type LoginActions = LoginFailedAction | LoginRequestAction | LoginSuccessAction

const LOGIN_ENDPOINT = 'auth/login';

export const login = (email: string, password: string) => {
    return async function (dispatch: Dispatch<LoginActions>) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: LOGIN_REQUEST})
        return await request<{ success: boolean, refreshToken: string, accessToken: string }>(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            signal
        }).then(result => {
            clearTimeout(timeoutId);
            dispatch({type: LOGIN_SUCCESS})
            if (result.success) {
                Cookies.set('refreshToken', result.refreshToken, {
                    expires: 7,
                    secure: true,
                    sameSite: 'strict',
                    path: '/'
                });

                Cookies.set('accessToken', result.accessToken, {
                    expires: new Date(Date.now() + 20 * 60 * 1000),
                    secure: true,
                    sameSite: 'strict',
                    path: '/'
                });
            }
            return result.success;
        }).catch(error => {
            if (error.name === 'AbortError') {
                console.error("Order request timed out")
            }

            dispatch({type: LOGIN_FAILED})
            return false;
        });
    }
}