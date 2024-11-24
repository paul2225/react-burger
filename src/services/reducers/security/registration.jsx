import {REGISTRATION_FAILED, REGISTRATION_REQUEST, REGISTRATION_SUCCESS} from "../../actions/security/registration";


const initialState = {
    registrationRequest: false,
    registrationFailed: false,
};

export const registrationReducer = (state = initialState, action) => {
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