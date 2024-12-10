import React from 'react';
import {useDrag} from "react-dnd";
import styles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from "react-router-dom";
import {IIngredient} from "../../types/IIngredient";

function IngredientCard({ingredient, count}: { ingredient: IIngredient, count: number }) {
    const location = useLocation();

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient
    });

    return (
        <Link to={`/ingredients/${ingredient._id}`} state={{background: location}} ref={dragRef}
              className={styles.card}>
            <img
                src={ingredient.image}
                className={styles.img}
                alt={`Изображение ингредиента: ${ingredient.name}`}
            />

            <div className={styles.counter}>
                {count > 0 && <Counter count={count} size="default" extraClass="m-1"/>}
            </div>

            <div className={styles.price}>
                <p className="text text_type_main-default">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>

            <h3 className={styles.name}>{ingredient.name}</h3>
        </Link>
    );
}

export default IngredientCard;