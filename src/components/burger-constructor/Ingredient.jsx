import React from 'react';
import styles from "./ingredient.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientShape} from "../../types/IngredientPropTypes";

const typeName = {top: " (верх)", bottom: ' (низ)', null: ''}

function Ingredient(props) {
    return (
        <article className={styles.ingridient}>
            <span className={styles.icon}>
                {props.isDraggable && <div className={styles.icon}><DragIcon type="primary"/></div>}
            </span>
            <ConstructorElement
                type={props.type}
                isLocked={props.isLocked}
                text={props.ingredient.name + typeName[props.type]}
                price={props.ingredient.price}
                thumbnail={props.ingredient.image}
            />
        </article>
    );
}

Ingredient.propTypes = {
    isDraggable: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['top', 'bottom']),
    isLocked: PropTypes.bool.isRequired,
    ingredient: ingredientShape,
};

export default Ingredient;