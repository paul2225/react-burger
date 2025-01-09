import {combineReducers} from 'redux'
import {ingredientsReducer} from "./constructor/ingredients";
import {constructorIngredientsReducer} from "./constructor/constructorIngredients";
import {createdOrderReducer} from "./constructor/createdOrder";
import {forgotPasswordReducer} from "./security/forgotPassword";
import {resetPasswordReducer} from "./security/resetPassword";
import {registrationReducer} from "./security/registration";
import {loginReducer} from "./security/login";
import {logoutReducer} from "./security/logout";
import {saveUserInfoReducer} from "./profile/saveUserInfo";
import {getUserInfoReducer} from "./profile/getUserInfo";
import {ordersFeedReducer} from "./orders/ordersFeed";
import {userOrdersFeedReducer} from "./orders/userOrders";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    createdOrder: createdOrderReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    registration: registrationReducer,
    login: loginReducer,
    logout: logoutReducer,
    getUserInfo: getUserInfoReducer,
    saveUserInfo: saveUserInfoReducer,
    ordersFeed: ordersFeedReducer,
    usersOrders: userOrdersFeedReducer
});