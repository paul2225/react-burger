import {request} from "../../../utils/requests";

export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';

const RESET_PASSWORD_ENDPOINT = 'password-reset/reset';

export const resetPassword = (password, token) => {
    return async function (dispatch) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: RESET_PASSWORD_REQUEST})
        return await request(RESET_PASSWORD_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: password, token: token}),
            signal
        }).then(result => {
            clearTimeout(timeoutId);
            dispatch({type: RESET_PASSWORD_SUCCESS})
            return !!result.success;
        }).catch(error => {
            if (error.name === 'AbortError') {
                console.error("Order request timed out")
            }

            dispatch({type: RESET_PASSWORD_FAILED})
            return false;
        });
    }
}