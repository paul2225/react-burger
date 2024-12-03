import React from 'react';
import styles from './ingridient-details.module.css';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

function IngredientDetails() {
    const {id} = useParams();

    const ingredientsById = useSelector(state => state.ingredients.ingredientsById);
    const ingredient = ingredientsById[id];

    if (!ingredientsById[id]) {
        return null;
    }

    return (
        <section className={styles.ingredientDetails}>
            <header className={styles.header}>
                <h2 id="ingredient-details-heading" className={styles.headerText}>Детали ингредиента</h2>
            </header>
            <img
                className={styles.image}
                src={ingredient.image}
                alt={`Изображение ингредиента: ${ingredient.name}`}
            />

            <h3 className={styles.ingredientName}>{ingredient.name}</h3>
            <dl className={styles.ingredientsInfo}>
                <div className={styles.ingredientInfo}>
                    <dt className={styles.infoName}>Калории, ккал</dt>
                    <dd className={styles.infoData}>{ingredient.calories}</dd>
                </div>
                <div className={styles.ingredientInfo}>
                    <dt className={styles.infoName}>Белки, г</dt>
                    <dd className={styles.infoData}>{ingredient.proteins}</dd>
                </div>
                <div className={styles.ingredientInfo}>
                    <dt className={styles.infoName}>Жиры, г</dt>
                    <dd className={styles.infoData}>{ingredient.fat}</dd>
                </div>
                <div className={styles.ingredientInfo}>
                    <dt className={styles.infoName}>Углеводы, г</dt>
                    <dd className={styles.infoData}>{ingredient.carbohydrates}</dd>
                </div>
            </dl>
        </section>
    )
}

export default IngredientDetails;