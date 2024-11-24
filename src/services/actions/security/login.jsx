import {BASE_API_URL, request} from "../../../utils/request";
import Cookies from 'js-cookie';

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const LOGIN_URL = BASE_API_URL + '/auth/login';

export const login = (email, password) => {
    return async function (dispatch) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: LOGIN_REQUEST})
        return await request(LOGIN_URL, {
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
            return !!result.success;
        }).catch(error => {
            if (error.name === 'AbortError') {
                console.error("Order request timed out")
            }

            dispatch({type: LOGIN_FAILED})
            return false;
        });
    }
}