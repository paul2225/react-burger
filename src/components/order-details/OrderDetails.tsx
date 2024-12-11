import React from 'react';
import styles from './order-details.module.css';
import doneIcon from '../../images/done_icon.svg'
import {IOrder} from "../../types/IOrder";

function OrderDetails({order}: { order: IOrder }) {
    return (
        <>
            <section className={styles.orderDetails}>
                <h2 className={styles.orderNumber}>{order.order.number}</h2>
                <p className={styles.orderIdentifierText}>идентификатор заказа</p>
                <img className={styles.completedIcon} src={doneIcon}
                     alt='Иконка завершения: заказ успешно принят и начат к приготовлению'/>
                <p className={styles.orderCookingText}>Ваш заказ начали готовить</p>
                <p className={styles.waitOrderText}>Дождитесь готовности на орбитальной станции</p>
            </section>
        </>
    )
}

export default OrderDetails;