import React, {useState} from 'react';
import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/OrderDetails";
import ReactDOM from "react-dom";
import Modal from "../modal/Modal";

function BurgerConstructor() {
    const [showOrderDetails, setShowOrderDetails] = useState(false)

    return (
        <div className={styles.constructor}>
            <div className={styles.ingredients}>
                {/*<Ingredient isLocked={true} name={'Краторная булка N-200i (верх)'} price={50} img={data[0].image}/>*/}
                {/*<Ingredient isLocked={true} name={'Краторная булка N-200i (верх)'} price={50} img={data[0].image}*/}
                {/*            isDraggable={true}/>*/}
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
            {showOrderDetails && ReactDOM.createPortal(
                <Modal
                    modal={<OrderDetails
                        orderNumber={123}
                        close={() => setShowOrderDetails(false)}
                    />}
                />,
                document.getElementById("modal")
            )}
        </div>
    )
}

export default BurgerConstructor;