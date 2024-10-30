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
            .catch(console.error);
    }, []);

    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                <section className={styles.ingridients}>
                    <BurgerIngredients ingredients={ingredients}/>
                </section>
                <section className={styles.constructor}>
                    <BurgerConstructor/>
                </section>
            </main>
        </>
    );
}

export default App;
