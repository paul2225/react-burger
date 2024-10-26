import React from 'react';
import styles from './ingridient-details.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function IngredientDetails(props) {
    return (
        <div className={styles.ingredientDetails}>
            <div className={styles.header}>
                <p className={styles.headerText}>Детали ингридиента</p>
                <div className={styles.closeIcon} onClick={props.close}>
                    <CloseIcon type="primary"/>
                </div>
            </div>
            <img className={styles.image} src={props.ingredient.image} alt="Ingredient"/>
            <p className={styles.ingredientName}>{props.ingredient.name}</p>
            <div className={styles.ingredientsInfo}>
                <div className={styles.ingredientInfo}>
                    <p className={styles.infoName}>Калории,ккал</p>
                    <p className={styles.infoData}>{props.ingredient.calories}</p>
                </div>
                <div className={styles.ingredientInfo}>
                    <p className={styles.infoName}>Белки,г</p>
                    <p className={styles.infoData}>{props.ingredient.proteins}</p>
                </div>
                <div className={styles.ingredientInfo}>
                    <p className={styles.infoName}>Жиры,г</p>
                    <p className={styles.infoData}>{props.ingredient.fat}</p>
                </div>
                <div className={styles.ingredientInfo}>
                    <p className={styles.infoName}>Углеводы,г</p>
                    <p className={styles.infoData}>{props.ingredient.carbohydrates}</p>
                </div>

            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    close: PropTypes.func.isRequired,
    ingredient: PropTypes.object.isRequired,
}

export default IngredientDetails;