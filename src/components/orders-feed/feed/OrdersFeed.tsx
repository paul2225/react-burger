import styles from './orders-feed.module.css'
import {OrdersFeedElement} from "../orders-feed-element/OrdersFeedElement";
import {useDispatch} from "react-redux";
import {useSelector} from "../../../index";
import {useEffect} from "react";
import {ORDERS_FEED_WS_CONNECTION_START} from "../../../services/actions/orders/ordersFeed";
import {USER_ORDERS_FEED_WS_CONNECTION_START} from "../../../services/actions/orders/userOrders";
import Cookies from "js-cookie";

export function OrdersFeed({usersOrdersOnly}: { usersOrdersOnly: boolean }) {
    const dispatch = useDispatch();
    const allOrders = useSelector(state => state.ordersFeed);
    const usersOrders = useSelector(state => state.usersOrders);

    useEffect(
        () => {
            if (usersOrdersOnly) {
                dispatch({type: USER_ORDERS_FEED_WS_CONNECTION_START, token: Cookies.get("accessToken")});
            } else {
                dispatch({type: ORDERS_FEED_WS_CONNECTION_START});
            }
        }, [dispatch, usersOrdersOnly]
    );

    return (
        <section className={styles.orders}>
            <section className={styles.ordersList}>
                {[...(usersOrdersOnly ? usersOrders.orders : allOrders.orders).orders]
                    .sort((a, b) => b.number - a.number)
                    .map(order => <OrdersFeedElement key={order._id} order={order}/>)
                }
            </section>
        </section>
    )
}