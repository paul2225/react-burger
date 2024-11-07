import React from 'react';
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import styles from "./ingredient.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientShape} from "../../types/IngredientPropTypes";
import {REMOVE_CONSTRUCTOR_INGREDIENT} from "../../services/actions/constructorIngredients";

const typeName = {top: " (верх)", bottom: ' (низ)', null: ''}

function Ingredient(props) {
    const [, dragRef] = useDrag({
        type: "constructorIngredient",
        item: {index: props.index, ingredient: props.ingredient},
        canDrag: () => props.isDraggable,
    });

    const [, dropRef] = useDrop({
        accept: "constructorIngredient",
        hover: (item) => {
            if (item.index !== props.index) {
                if (props.ingredient.type !== 'bun' && item.ingredient.type !== 'bun') {
                    props.moveIngredient(item.index, props.index);
                    item.index = props.index;
                }
            }
        }
    });

    const combinedRef = node => {
        dragRef(dropRef(node));
    };

    const dispatch = useDispatch();

    return (
        <article className={styles.ingridient} ref={combinedRef}>
            <span className={styles.icon}>
                {props.isDraggable && <div className={styles.icon}><DragIcon type="primary"/></div>}
            </span>
            <ConstructorElement
                type={props.type}
                isLocked={props.isLocked}
                text={props.ingredient.name + typeName[props.type]}
                price={props.ingredient.price}
                thumbnail={props.ingredient.image}
                handleClose={() => dispatch({type: REMOVE_CONSTRUCTOR_INGREDIENT, index: props.index})}
            />
        </article>
    );
}

Ingredient.propTypes = {
    isDraggable: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['top', 'bottom']),
    isLocked: PropTypes.bool.isRequired,
    ingredient: ingredientShape,
    moveIngredient: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default Ingredient;