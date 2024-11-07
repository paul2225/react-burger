import React from 'react';
import styles from './order-details.module.css';
import doneIcon from '../../images/done_icon.svg'
import {orderShape} from "../../types/OrderPropTypes";

function OrderDetails(props) {
    return (
        <>
            <section className={styles.orderDetails}>
                <h2 className={styles.orderNumber}>{props.order.order.number}</h2>
                <p className={styles.orderIdentifierText}>идентификатор заказа</p>
                <img className={styles.completedIcon} src={doneIcon}
                     alt='Иконка завершения: заказ успешно принят и начат к приготовлению'/>
                <p className={styles.orderCookingText}>Ваш заказ начали готовить</p>
                <p className={styles.waitOrderText}>Дождитесь готовности на орбитальной станции</p>
            </section>
        </>
    )
}

OrderDetails.propTypes = {
    order: orderShape.isRequired
}

export default OrderDetails;