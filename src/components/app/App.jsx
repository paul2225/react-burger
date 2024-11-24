import React from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from './app.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingridients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {Route, Routes} from "react-router-dom";
import RegistrationPage from "../../pages/security-pages/registration-page/RegistrationPage";
import LoginPage from "../../pages/security-pages/login-page/LoginPage";
import ForgotPasswordPage from "../../pages/security-pages/forgot-password/ForgotPasswordPage";
import PasswordResetPage from "../../pages/security-pages/password-reset/PasswordResetPage";
import ProfilePage from "../../pages/profile-page/ProfilePage";
import ProtectedRoute from "../security/protected-route/ProtectedRoute";
import IngredientDetailsPage from "../../pages/ingredient-details-page/IngredientDetailsPage";
import {ingredientShape} from "../../types/IngredientPropTypes";

function MainPage(props) {
    return (
        <>
            <main className={styles.main}>
                <section className={styles.ingridients}>
                    <BurgerIngredients viewedIngredient={props.viewedIngredient}/>
                </section>
                <section className={styles.constructor}>
                    <BurgerConstructor/>
                </section>
            </main>
        </>
    );
}

function App() {
    const viewedIngredientRaw = sessionStorage.getItem('viewedIngredient');
    const viewedIngredient = viewedIngredientRaw ? JSON.parse(viewedIngredientRaw) : null;

    return (
        <DndProvider backend={HTML5Backend}>
            <AppHeader/>
            <Routes>
                <Route path="/profile" element={<ProtectedRoute element={<ProfilePage/>}/>}/>
                <Route path="/profile/*" element={<ProtectedRoute element={<ProfilePage/>}/>}/>

                <Route path="/register"
                       element={<ProtectedRoute unauthorizedOnly={true} element={<RegistrationPage/>}/>}/>
                <Route path="/login" element={<ProtectedRoute unauthorizedOnly={true} element={<LoginPage/>}/>}/>
                <Route path="/forgot-password"
                       element={<ProtectedRoute unauthorizedOnly={true} element={<ForgotPasswordPage/>}/>}/>
                <Route path="/reset-password"
                       element={<ProtectedRoute unauthorizedOnly={true} element={<PasswordResetPage/>}/>}/>

                <Route path="*" element={<MainPage/>}/>
                <Route path="/ingredients/:id"
                       element={viewedIngredient == null
                           ? <IngredientDetailsPage/>
                           : <MainPage viewedIngredient={viewedIngredient}/>
                       }
                />
            </Routes>

        </DndProvider>
    );
}

MainPage.propTypes = {
    viewedIngredient: ingredientShape.isRequired,
}

export default App;
