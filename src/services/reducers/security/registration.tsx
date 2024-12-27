import {
    REGISTRATION_FAILED,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    TRegistrationActions
} from "../../actions/security/registration";

type TRegistrationState = {
    registrationRequest: boolean,
    registrationFailed: boolean,
}

const initialState: TRegistrationState = {
    registrationRequest: false,
    registrationFailed: false,
};

export const registrationReducer = (state = initialState, action: TRegistrationActions): TRegistrationState => {
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