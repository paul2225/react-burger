import {request} from "../../../utils/requests";

export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';

const FORGOT_PASSWORD_ENDPOINT = 'password-reset';

export const forgotPassword = (email) => {
    return async function (dispatch) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: FORGOT_PASSWORD_REQUEST})
        return await request(FORGOT_PASSWORD_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email}),
            signal
        }).then(result => {
            clearTimeout(timeoutId);
            dispatch({type: FORGOT_PASSWORD_SUCCESS})
            return !!result.success;
        }).catch(error => {
            if (error.name === 'AbortError') {
                console.error("Order request timed out")
            }

            dispatch({type: FORGOT_PASSWORD_FAILED})
            return false;
        });
    }
}