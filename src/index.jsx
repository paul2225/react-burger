import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from "./services/reducers/rootReducer";

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    // </React.StrictMode>
);

reportWebVitals();