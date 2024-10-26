import React from 'react';
import styles from './order-details.module.css';
import PropTypes from "prop-types";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import doneIcon from '../../images/done_icon.svg'

function OrderDetails(props) {
    return (
        <>
            <div className={styles.orderDetails}>
                <div className={styles.closeIcon} onClick={props.close}>
                    <CloseIcon type="primary" />
                </div>
                <p className={styles.orderNumber}>{props.orderNumber}</p>
                <p className={styles.orderIdentifierText}>идентификатор заказа</p>
                <img className={styles.completedIcon} src={doneIcon} alt='done_icon'/>
                <p className={styles.orderCookingText}>Ваш заказ начали готовить</p>
                <p className={styles.waitOrderText}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </>
    )
}

OrderDetails.propTypes = {
    close: PropTypes.func.isRequired,
    orderNumber: PropTypes.number.isRequired,
}

export default OrderDetails;