import React from 'react';
import styles from './order-details.module.css';
import PropTypes from "prop-types";
import doneIcon from '../../images/done_icon.svg'

function OrderDetails(props) {
    return (
        <>
            <section className={styles.orderDetails}>
                <h2 className={styles.orderNumber}>{props.orderNumber}</h2>
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
    orderNumber: PropTypes.number.isRequired,
}

export default OrderDetails;