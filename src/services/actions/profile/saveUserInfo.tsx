import {requestWithAuth} from "../../../utils/requests";
import {Dispatch} from "redux";

export const SAVE_USER_INFO_FAILED = 'SAVE_USER_INFO_FAILED';
export const SAVE_USER_INFO_REQUEST = 'SAVE_USER_INFO_REQUEST';
export const SAVE_USER_INFO_SUCCESS = 'SAVE_USER_INFO_SUCCESS';

interface SaveUserInfoFailedAction {
    type: typeof SAVE_USER_INFO_FAILED;
}

interface SaveUserInfoRequestAction {
    type: typeof SAVE_USER_INFO_REQUEST;
}

interface SaveUserInfoSuccessAction {
    type: typeof SAVE_USER_INFO_SUCCESS;
}

export type SaveUserInfoActions = SaveUserInfoFailedAction | SaveUserInfoRequestAction | SaveUserInfoSuccessAction

const SAVE_USER_INFO_ENDPOINT = 'auth/user';

export const saveUserInfo = (name: string, email: string, password: string) => {
    return async function (dispatch: Dispatch<SaveUserInfoActions>) {
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

                return result.success;
            }).catch((error) => {
                console.error(error)
                dispatch({type: SAVE_USER_INFO_FAILED})
                return false;
            });
    }
}