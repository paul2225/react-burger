import React from 'react';
import {IIngredient} from "../../types/IIngredient";
import {useAppSelector} from "../../index";
import styles from "./ingredients-container.module.css"
import IngredientCard from "./IngredientCard";

function IngredientsContainer({header, ingredients}: { header: string, ingredients: Array<IIngredient> }) {
    const constructorIngredients = useAppSelector(state => state.constructorIngredients.ingredients);

    return (
        <>
            <p className={styles.ingredientsHeader}>
                {header}
            </p>
            <div className={styles.ingredientsContainer}>
                {
                    ingredients.map(ingredient => <IngredientCard
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

export default IngredientsContainer;