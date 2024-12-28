import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider, TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook} from 'react-redux';
import {configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {rootReducer} from "./services/reducers/rootReducer";
import {socketMiddleware} from "./utils/socketMiddleware";
import {feedWSStoreActions, TOrdersFeedWSActions} from "./services/actions/orders/ordersFeed";
import {TConstructorIngredientsActions} from "./services/actions/constructor/constructorIngredients";
import {TCreatedOrderActions} from "./services/actions/constructor/createdOrder";
import {TIngredientsActions} from "./services/actions/constructor/ingredients";
import {TGetUserInfoActions} from "./services/actions/profile/getUserInfo";
import {TSaveUserInfoActions} from "./services/actions/profile/saveUserInfo";
import {TForgotPasswordActions} from "./services/actions/security/forgotPassword";
import {TLoginActions} from "./services/actions/security/login";
import {TLogoutActions} from "./services/actions/security/logout";
import {TRegistrationActions} from "./services/actions/security/registration";
import {TResetPasswordActions} from "./services/actions/security/resetPassword";
import {TUserOrdersFeedWSActions, userOrdersStoreActions} from "./services/actions/orders/userOrders";

const ORDERS_FEED_WS_ENDPOINT = "wss://norma.nomoreparties.space/orders/all";
const USER_ORDERS_FEED_WS_ENDPOINT = "wss://norma.nomoreparties.space/orders";

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(socketMiddleware(ORDERS_FEED_WS_ENDPOINT, feedWSStoreActions), socketMiddleware(USER_ORDERS_FEED_WS_ENDPOINT, userOrdersStoreActions))
});

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root')!);


export type AppActions =
    TConstructorIngredientsActions
    | TCreatedOrderActions
    | TIngredientsActions
    | TGetUserInfoActions
    | TSaveUserInfoActions
    | TForgotPasswordActions
    | TLoginActions
    | TLogoutActions
    | TRegistrationActions
    | TResetPasswordActions
    | TOrdersFeedWSActions
    | TUserOrdersFeedWSActions;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();