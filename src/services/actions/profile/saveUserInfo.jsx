import {requestWithAuth} from "../../../utils/requests";

export const SAVE_USER_INFO_FAILED = 'SAVE_USER_INFO_FAILED';
export const SAVE_USER_INFO_REQUEST = 'SAVE_USER_INFO_REQUEST';
export const SAVE_USER_INFO_SUCCESS = 'SAVE_USER_INFO_SUCCESS';

const SAVE_USER_INFO_ENDPOINT = 'auth/user';

export const saveUserInfo = (name, email, password) => {
    return async function (dispatch) {
        dispatch({type: SAVE_USER_INFO_REQUEST})
        return await requestWithAuth(SAVE_USER_INFO_ENDPOINT, 'PATCH', {
            name: name,
            email: email,
            password: password
        })
        .then(result => {
            if (result.success) {
                dispatch({type: SAVE_USER_INFO_SUCCESS})
            }

            return !!result.success;
        }).catch((error) => {
            console.error(error)
            dispatch({type: SAVE_USER_INFO_FAILED})
            return false;
        });
    }
}