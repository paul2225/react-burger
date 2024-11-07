import {REMOVE_VIEWED_INGREDIENT, SET_VIEWED_INGREDIENT} from "../actions/viewedIngredient";

const initialState = {
    ingredient: null,
};

export const viewedIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIEWED_INGREDIENT: {
            return {
                ...state,
                ingredient: action.viewedIngredient
            };
        }
        case REMOVE_VIEWED_INGREDIENT: {
            return {
                ...state,
                ingredient: null
            };
        }
        default: {
            return state;
        }
    }
};