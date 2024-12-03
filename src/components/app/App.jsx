import React, {useEffect} from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from './app.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingridients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import RegistrationPage from "../../pages/security-pages/registration-page/RegistrationPage";
import LoginPage from "../../pages/security-pages/login-page/LoginPage";
import ForgotPasswordPage from "../../pages/security-pages/forgot-password/ForgotPasswordPage";
import PasswordResetPage from "../../pages/security-pages/password-reset/PasswordResetPage";
import ProfilePage from "../../pages/profile-page/ProfilePage";
import ProtectedRoute from "../security/protected-route/ProtectedRoute";
import IngredientDetailsPage from "../../pages/ingredient-details-page/IngredientDetailsPage";
import {ingredientShape} from "../../types/IngredientPropTypes";
import {getIngredients} from "../../services/actions/constructor/ingredients";
import {useDispatch} from "react-redux";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import Modal from "../modal/Modal";

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
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state?.background;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <DndProvider backend={HTML5Backend}>
            <AppHeader/>
            <Routes location={background || location}>
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
                <Route path="/ingredients/:id" element={<IngredientDetailsPage/>}/>
            </Routes>

            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal
                            close={() => navigate(-1)}
                            modal={<IngredientDetails/>}
                        />
                    }/>
                </Routes>
            )}

        </DndProvider>
    );
}

MainPage.propTypes = {
    viewedIngredient: ingredientShape,
}

export default App;
