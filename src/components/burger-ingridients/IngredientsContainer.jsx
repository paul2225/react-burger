import React from 'react';
import styles from "./ingredients-container.module.css";
import IngredientCard from "./IngredientCard";
import PropTypes from "prop-types";
import {ingredientShape} from "../../types/IngredientPropTypes";

function IngredientsContainer(props) {
    return (
        <>
            <p className={styles.ingredientsHeader}>
                {props.header}
            </p>
            <div className={styles.ingredientsContainer}>
                {
                    props.ingredients.map(ingredient =>
                        <IngredientCard
                            key={ingredient._id}
                            onClick={() => props.chooseIngredient(ingredient._id)}
                            ingredient={ingredient}
                        />
                    )
                }
            </div>
        </>
    )
}

IngredientsContainer.propTypes = {
    header: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientShape).isRequired,
    chooseIngredient: PropTypes.func.isRequired
}

export default IngredientsContainer;