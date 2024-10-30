import React from 'react';
import styles from './ingridient-details.module.css';
import {ingredientShape} from "../../types/IngredientPropTypes";

function IngredientDetails(props) {
    return (
        <section className={styles.ingredientDetails}>
            <header className={styles.header}>
                <h2 id="ingredient-details-heading" className={styles.headerText}>Детали ингредиента</h2>
            </header>
            <img
                className={styles.image}
                src={props.ingredient.image}
                alt={`Изображение ингредиента: ${props.ingredient.name}`}
            />

            <h3 className={styles.ingredientName}>{props.ingredient.name}</h3>
            <dl className={styles.ingredientsInfo}>
                <div className={styles.ingredientInfo}>
                    <dt className={styles.infoName}>Калории, ккал</dt>
                    <dd className={styles.infoData}>{props.ingredient.calories}</dd>
                </div>
                <div className={styles.ingredientInfo}>
                    <dt className={styles.infoName}>Белки, г</dt>
                    <dd className={styles.infoData}>{props.ingredient.proteins}</dd>
                </div>
                <div className={styles.ingredientInfo}>
                    <dt className={styles.infoName}>Жиры, г</dt>
                    <dd className={styles.infoData}>{props.ingredient.fat}</dd>
                </div>
                <div className={styles.ingredientInfo}>
                    <dt className={styles.infoName}>Углеводы, г</dt>
                    <dd className={styles.infoData}>{props.ingredient.carbohydrates}</dd>
                </div>
            </dl>
        </section>
    )
}

IngredientDetails.propTypes = {
    ingredient: ingredientShape.isRequired,
}

export default IngredientDetails;