import React from 'react';
import styles from "./ingredients-container.module.css";
import IngredientCard from "./IngredientCard";
import PropTypes from "prop-types";

function IngredientsContainer(props) {
    return (
        <>
            <p className={styles.ingredientsHeader}>
                {props.header}
            </p>
            <div className={styles.ingredientsContainer}>
                {
                    props.items.map(item =>
                        <IngredientCard
                            onClick={() => props.chooseIngredient(item._id)}
                            key={item._id}
                            img={item.image}
                            price={item.price}
                            name={item.name}
                        />
                    )
                }
            </div>
        </>
    )
}

IngredientsContainer.propTypes = {
    header: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
}

export default IngredientsContainer;