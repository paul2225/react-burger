import {request} from "../../../utils/requests";
import Cookies from 'js-cookie';
import {Dispatch} from "redux";

export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';

interface RegistrationFailedAction {
    type: typeof REGISTRATION_FAILED;
}

interface RegistrationRequestAction {
    type: typeof REGISTRATION_REQUEST;
}

interface RegistrationSuccessAction {
    type: typeof REGISTRATION_SUCCESS;
}

export type RegistrationActions = RegistrationFailedAction | RegistrationRequestAction | RegistrationSuccessAction

const REGISTRATION_ENDPOINT = 'auth/register';

export const registration = (name: string, email: string, password: string) => {
    return async function (dispatch: Dispatch<RegistrationActions>) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: REGISTRATION_REQUEST})
        return await request<{ success: boolean, refreshToken: string }>(REGISTRATION_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
            signal
        }).then(result => {
            clearTimeout(timeoutId);
            dispatch({type: REGISTRATION_SUCCESS})
            if (result.success) {
                Cookies.set('refreshToken', result.refreshToken, {
                    expires: 7,
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

            dispatch({type: REGISTRATION_FAILED})
            return false;
        });
    }
}