import React from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from './app.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingridients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <AppHeader/>
            <main className={styles.main}>
                <section className={styles.ingridients}>
                    <BurgerIngredients/>
                </section>
                <section className={styles.constructor}>
                    <BurgerConstructor/>
                </section>
            </main>
        </DndProvider>
    );
}

export default App;
