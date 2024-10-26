import React from 'react';
import styles from './ingredient-card.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function IngredientCard(props) {
    return (
        <div className={styles.card} onClick={props.onClick}>
            <img src={props.img} className={styles.img} alt='ingridient-card'/>
            <div className={styles.price}>
                <p className='text text_type_main-default'>{props.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={styles.name}>{props.name}</p>
        </div>
    );
}

IngredientCard.propTypes = {
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

export default IngredientCard;