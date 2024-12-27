import {request} from "../../../utils/requests";
import {Dispatch} from "redux";

export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';

interface IResetPasswordFailedAction {
    type: typeof RESET_PASSWORD_FAILED;
}

interface IResetPasswordRequestAction {
    type: typeof RESET_PASSWORD_REQUEST;
}

interface IResetPasswordSuccessAction {
    type: typeof RESET_PASSWORD_SUCCESS;
}

export type TResetPasswordActions = IResetPasswordFailedAction | IResetPasswordRequestAction | IResetPasswordSuccessAction;

const RESET_PASSWORD_ENDPOINT = 'password-reset/reset';

export const resetPassword = (password: string, token: string) => {
    return async function (dispatch: Dispatch<TResetPasswordActions>) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: RESET_PASSWORD_REQUEST})
        return await request<{ success: boolean }>(RESET_PASSWORD_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: password, token: token}),
            signal
        }).then(result => {
            clearTimeout(timeoutId);
            dispatch({type: RESET_PASSWORD_SUCCESS})
            return result.success;
        }).catch(error => {
            if (error.name === 'AbortError') {
                console.error("Order request timed out")
            }

            dispatch({type: RESET_PASSWORD_FAILED})
            return false;
        });
    }
}