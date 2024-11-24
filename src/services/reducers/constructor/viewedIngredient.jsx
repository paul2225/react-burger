import {REMOVE_VIEWED_INGREDIENT, SET_VIEWED_INGREDIENT} from "../../actions/constructor/viewedIngredient";

const initialState = {
    ingredient: null,
};

export const viewedIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIEWED_INGREDIENT: {

            sessionStorage.setItem('viewedIngredient', JSON.stringify(action.viewedIngredient));
            return {
                ...state,
                ingredient: action.viewedIngredient
            };
        }
        case REMOVE_VIEWED_INGREDIENT: {
            sessionStorage.removeItem('viewedIngredient');
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