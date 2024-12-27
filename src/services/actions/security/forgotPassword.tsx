import {request} from "../../../utils/requests";
import {Dispatch} from "redux";

export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';
export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';

interface IForgotPasswordFailedAction {
    type: typeof FORGOT_PASSWORD_FAILED;
}

interface IForgotPasswordRequestAction {
    type: typeof FORGOT_PASSWORD_REQUEST
}

interface IForgotPasswordSuccessAction {
    type: typeof FORGOT_PASSWORD_SUCCESS
}

export type TForgotPasswordActions =
    IForgotPasswordFailedAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction;

const FORGOT_PASSWORD_ENDPOINT = 'password-reset';

export const forgotPassword = (email: string) => {
    return async function (dispatch: Dispatch<TForgotPasswordActions>) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: FORGOT_PASSWORD_REQUEST})
        return await request<{ success: boolean }>(FORGOT_PASSWORD_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email}),
            signal
        }).then(result => {
            clearTimeout(timeoutId);
            dispatch({type: FORGOT_PASSWORD_SUCCESS})
            return result.success;
        }).catch(error => {
            if (error.name === 'AbortError') {
                console.error("Order request timed out")
            }

            dispatch({type: FORGOT_PASSWORD_FAILED})
            return false;
        });
    }
}