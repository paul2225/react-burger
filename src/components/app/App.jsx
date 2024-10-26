import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingridients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";

function App() {
    const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch(INGREDIENTS_URL)
            .then(result => {
                if (result.ok) {
                    return result.json()
                }

                return Promise.reject(result.status);
            })
            .then(result => {
                setIngredients([...result.data]);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <AppHeader/>
            <div className={styles.main}>
                <div className={styles.ingridients}>
                    <BurgerIngredients ingredients={ingredients}/>
                </div>
                <div className={styles.constructor}>
                    <BurgerConstructor/>
                </div>
            </div>
        </>
    );
}

export default App;
