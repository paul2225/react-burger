import {
    REGISTRATION_FAILED,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    RegistrationActions
} from "../../actions/security/registration";

type TInitialState = {
    registrationRequest: boolean,
    registrationFailed: boolean,
}

const initialState: TInitialState = {
    registrationRequest: false,
    registrationFailed: false,
};

export const registrationReducer = (state = initialState, action: RegistrationActions) => {
    switch (action.type) {
        case REGISTRATION_REQUEST: {
            return {
                ...state,
                registrationRequest: true
            };
        }
        case REGISTRATION_SUCCESS: {
            return {
                ...state,
                registrationFailed: false,
                registrationRequest: false
            };
        }
        case REGISTRATION_FAILED: {
            return {...state, registrationFailed: true, registrationRequest: false};
        }
        default: {
            return state;
        }
    }
};