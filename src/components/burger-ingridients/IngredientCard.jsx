import React from 'react';
import styles from './ingredient-card.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientShape} from "../../types/IngredientPropTypes";

function IngredientCard(props) {
    return (
        <article className={styles.card} onClick={props.onClick}>
            <img
                src={props.ingredient.image}
                className={styles.img}
                alt={`Изображение ингредиента: ${props.ingredient.name}`}
            />

            <div className={styles.price}>
                <p className="text text_type_main-default">{props.ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>

            <h3 className={styles.name}>{props.ingredient.name}</h3>
        </article>
    );
}

IngredientCard.propTypes = {
    onClick: PropTypes.func.isRequired,
    ingredient: ingredientShape.isRequired,
}

export default IngredientCard;