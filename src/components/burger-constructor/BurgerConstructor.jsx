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
    data.forEach(ingredient => {
        ingredientsById[ingredient._id] = ingredient
    })

    return (
        <section className={styles.constructor}>
            <div className={styles.ingredients}>
                <Ingredient type='top' isDraggable={false} isLocked={true}
                            ingredient={ingredientsById['60666c42cc7b410027a1a9b1']}/>
                <Ingredient isDraggable={true} isLocked={false}
                            ingredient={ingredientsById['60666c42cc7b410027a1a9b5']}/>
                <Ingredient isDraggable={true} isLocked={false}
                            ingredient={ingredientsById['60666c42cc7b410027a1a9b7']}/>
                <Ingredient isDraggable={true} isLocked={false}
                            ingredient={ingredientsById['60666c42cc7b410027a1a9bc']}/>
                <Ingredient type='bottom' isDraggable={false} isLocked={true}
                            ingredient={ingredientsById['60666c42cc7b410027a1a9b1']}/>
            </div>
            <div className={styles.orderDetails}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">123</p>
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