import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/OrderDetails";
import Modal from "../modal/Modal";
import Ingredient from "./Ingredient";
import {
    ADD_CONSTRUCTOR_INGREDIENT,
    UPDATE_CONSTRUCTOR_INGREDIENTS
} from "../../services/actions/constructorIngredients";
import {CLEAR_CREATED_ORDER, getCreatedOrder} from "../../services/actions/createdOrder";

function BurgerConstructor() {
    const ingredients = useSelector(state => state.constructorIngredients.ingredients);
    const createdOrder = useSelector(state => state.createdOrder.order);

    const dispatch = useDispatch();

    const moveIngredient = (draggedIndex, targetIndex) => {
        const updatedIngredients = [...ingredients];
        const [removed] = updatedIngredients.splice(draggedIndex, 1);
        updatedIngredients.splice(targetIndex, 0, removed);
        dispatch({type: UPDATE_CONSTRUCTOR_INGREDIENTS, ingredients: updatedIngredients});
    };

    const [, dropTarget] = useDrop({
        accept: ["ingredient", "constructorIngredient"],
        drop(item, monitor) {
            const itemType = monitor.getItemType();

            if (itemType === 'ingredient') {
                dispatch({type: ADD_CONSTRUCTOR_INGREDIENT, ingredient: item});
            } else if (itemType === 'constructorIngredient') {
                const draggedIndex = item.index;
                const targetIndex = monitor.getItem().index;

                if (ingredients[targetIndex].type !== 'bun' && ingredients[draggedIndex].type !== 'bun') {
                    if (draggedIndex !== targetIndex) {
                        moveIngredient(draggedIndex, targetIndex);
                    }
                }
            }
        },
    });

    const totalSum = useMemo(() => ingredients
            .map(ingredient => ingredient.price)
            .reduce((acc, num) => acc + num, 0),
        [ingredients]
    );

    return (
        <section className={styles.constructor}>
            <div className={styles.ingredients} ref={dropTarget}>
                {ingredients.map((ingredient, index) => {
                    let isDraggable = true;
                    let type = null;
                    let locked = false;
                    if (ingredient.type === 'bun' && (index === 0 || index === ingredients.length - 1)) {
                        type = index === 0 ? 'top' : 'bottom';
                        locked = true;
                        isDraggable = false;
                    }

                    return (
                        <Ingredient
                            key={ingredient._id + index}
                            index={index}
                            type={type}
                            isDraggable={isDraggable}
                            isLocked={locked}
                            ingredient={ingredient}
                            moveIngredient={moveIngredient}
                        />
                    );
                })}
            </div>
            <div className={styles.orderDetails}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">{totalSum}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={() => dispatch(getCreatedOrder(ingredients.map(ingredient => ingredient._id)))}
                >
                    Оформить заказ
                </Button>
            </div>
            {createdOrder != null && <Modal
                modal={<OrderDetails order={createdOrder}/>}
                close={() => dispatch({type: CLEAR_CREATED_ORDER})}
            />}
        </section>
    )
}

export default BurgerConstructor;