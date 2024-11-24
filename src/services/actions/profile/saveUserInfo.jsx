import {BASE_API_URL, request} from "../../../utils/request";
import Cookies from 'js-cookie';

export const SAVE_USER_INFO_FAILED = 'SAVE_USER_INFO_FAILED';
export const SAVE_USER_INFO_REQUEST = 'SAVE_USER_INFO_REQUEST';
export const SAVE_USER_INFO_SUCCESS = 'SAVE_USER_INFO_SUCCESS';

const SAVE_USER_INFO_URL = BASE_API_URL + '/auth/user';

export const saveUserInfo = (name, email, password) => {
    return async function (dispatch) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        dispatch({type: SAVE_USER_INFO_REQUEST})
        return await request(SAVE_USER_INFO_URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('accessToken')
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
            signal
        }).then(result => {
            clearTimeout(timeoutId);
            if (result.success) {
                dispatch({type: SAVE_USER_INFO_SUCCESS})
            }
            return !!result.success;
        }).catch(error => {
            if (error.name === 'AbortError') {
                console.error("Order request timed out")
            }

            dispatch({type: SAVE_USER_INFO_FAILED})
            return false;
        });
    }
}