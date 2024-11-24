import React from 'react';
import {useDispatch} from "react-redux";
import {useDrag} from "react-dnd";
import styles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientShape} from "../../types/IngredientPropTypes";
import {SET_VIEWED_INGREDIENT} from "../../services/actions/constructor/viewedIngredient";
import PropTypes from "prop-types";

function IngredientCard(props) {
    const dispatch = useDispatch()

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: props.ingredient
    });

    function handleClick() {
        dispatch({type: SET_VIEWED_INGREDIENT, viewedIngredient: props.ingredient})
        window.history.pushState({}, '', '/ingredients/' + props.ingredient._id);
    }

    return (
        <article ref={dragRef} className={styles.card} onClick={handleClick}>
            <img
                src={props.ingredient.image}
                className={styles.img}
                alt={`Изображение ингредиента: ${props.ingredient.name}`}
            />

            <div className={styles.counter}>
                {props.count > 0 && <Counter count={props.count} size="default" extraClass="m-1"/>}
            </div>

            <div className={styles.price}>
                <p className="text text_type_main-default">{props.ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>

            <h3 className={styles.name}>{props.ingredient.name}</h3>
        </article>
    );
}

IngredientCard.propTypes = {
    ingredient: ingredientShape.isRequired,
    count: PropTypes.number.isRequired
}

export default IngredientCard;