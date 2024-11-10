import React from 'react';
import styles from "./ingredients-container.module.css";
import IngredientCard from "./IngredientCard";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {ingredientShape} from "../../types/IngredientPropTypes";

function IngredientsContainer(props) {
    const constructorIngredients = useSelector(state => state.constructorIngredients.ingredients);

    return (
        <>
            <p className={styles.ingredientsHeader}>
                {props.header}
            </p>
            <div className={styles.ingredientsContainer}>
                {
                    props.ingredients.map(ingredient => <IngredientCard
                            key={ingredient._id}
                            ingredient={ingredient}
                            count={constructorIngredients
                                .filter(constructorIngredient => constructorIngredient._id === ingredient._id)
                                .length}
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
}

export default IngredientsContainer;