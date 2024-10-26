import React from 'react';
import styles from "./ingredient.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Ingredient(props) {
    return (
        <div className={styles.ingridient}>
            <div className={styles.icon}>
                {props.isDraggable && <div className={styles.icon}><DragIcon type="primary"/></div>}
            </div>
            <ConstructorElement
                type="top"
                isLocked={props.isLocked}
                text={props.name}
                price={props.price}
                thumbnail={props.img}
            />
        </div>
    );
}

Ingredient.propTypes = {
    isDraggable: PropTypes.bool.isRequired,
    isLocked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired
};

export default Ingredient;