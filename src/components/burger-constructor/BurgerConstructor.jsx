import React, {useState} from 'react';
import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/OrderDetails";
import Modal from "../modal/Modal";
import Ingredient from "./Ingredient";
import data from '../../utils/data.js'

function BurgerConstructor() {
    const [showOrderDetails, setShowOrderDetails] = useState(false)
    const ingredientsById = {}
    data.forEach(ingredient => ingredientsById[ingredient._id] = ingredient)
    const hardcodedIngredients = [ingredientsById['60666c42cc7b410027a1a9b1'], ingredientsById['60666c42cc7b410027a1a9b5'],
        ingredientsById['60666c42cc7b410027a1a9b7'], ingredientsById['60666c42cc7b410027a1a9bc'], ingredientsById['60666c42cc7b410027a1a9b1']]

    return (
        <section className={styles.constructor}>
            <div className={styles.ingredients}>
                {hardcodedIngredients.map((ingredient, index) => {
                    let isDraggable = true;
                    let type = null;
                    let locked = false;
                    if (index === 0 || index === hardcodedIngredients.length - 1) {
                        type = index === 0 ? 'top' : 'bottom';
                        locked = true;
                        isDraggable = false;
                    }

                    return (
                        <Ingredient key={ingredient._id + index} type={type} isDraggable={isDraggable} isLocked={locked}
                                    ingredient={ingredient}/>);
                })}
            </div>
            <div className={styles.orderDetails}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">
                        {hardcodedIngredients.map(ingredient => ingredient.price).reduce((acc, num) => acc + num, 0)}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={() => setShowOrderDetails(true)}
                >
                    Оформить заказ
                </Button>
            </div>
            {showOrderDetails && <Modal
                close={() => setShowOrderDetails(false)}
                modal={<OrderDetails orderNumber={123}/>}
            />}
        </section>
    )
}

export default BurgerConstructor;