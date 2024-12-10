import React from 'react';
import {ConnectableElement, useDrag, useDrop} from "react-dnd";
import styles from "./ingredient.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {BunType, IIngredientElement, IngredientType} from "../../types/IIngredient";
import {REMOVE_CONSTRUCTOR_INGREDIENT} from "../../services/actions/constructor/constructorIngredients";
import {useAppDispatch} from "../../index";

const typeName = {[BunType.TOP]: " (верх)", [BunType.BOTTOM]: ' (низ)'}

function Ingredient(ingredientElement: IIngredientElement) {
    const [, dragRef] = useDrag({
        type: "constructorIngredient",
        item: {index: ingredientElement.index, ingredient: ingredientElement.ingredient},
        canDrag: () => ingredientElement.isDraggable,
    });

    const [, dropRef] = useDrop({
        accept: "constructorIngredient",
        hover: (item: IIngredientElement) => {
            if (item.index !== ingredientElement.index) {
                if (ingredientElement.ingredient.type !== IngredientType.BUN && item.ingredient.type !== IngredientType.BUN) {
                    ingredientElement.moveIngredient(item.index, ingredientElement.index);
                    item.index = ingredientElement.index;
                }
            }
        }
    });

    const combinedRef = (node: ConnectableElement) => {
        dragRef(dropRef(node));
    };

    const dispatch = useAppDispatch();

    return (
        <article className={styles.ingridient} ref={combinedRef}>
            <span className={styles.icon}>
                {ingredientElement.isDraggable && <div className={styles.icon}><DragIcon type="primary"/></div>}
            </span>
            <ConstructorElement
                type={ingredientElement.type}
                isLocked={ingredientElement.isLocked}
                text={ingredientElement.ingredient.name + (ingredientElement.type === undefined ? '' : typeName[ingredientElement.type])}
                price={ingredientElement.ingredient.price}
                thumbnail={ingredientElement.ingredient.image}
                handleClose={() => dispatch({type: REMOVE_CONSTRUCTOR_INGREDIENT, index: ingredientElement.index})}
            />
        </article>
    );
}

export default Ingredient;