import styles from "./order-summary.module.css";
import {IFeedOrder, OrderStatus} from "../../../types/IOrder";
import {useSelector} from "../../../index";
import Loader from "../../loader/Loader";
import {Link, useLocation} from "react-router-dom";

export function OrdersSummary() {
    const orders = useSelector(state => state.ordersFeed.orders);
    const location = useLocation();
    if (!orders || orders.orders.length === 0) return <Loader/>;
    const doneOrders = orders.orders.filter(order => order.status === OrderStatus.DONE);
    const pendingOrders = orders.orders.filter(order => order.status === OrderStatus.PENDING);

    function getGroupsPerN(orders: IFeedOrder[], n: number) {
        var list = new Array<IFeedOrder>();
        var lists = new Array<Array<IFeedOrder>>();
        for (let i = 0; i < orders.length; i++) {
            list.push(doneOrders[i]);
            if ((i + 1) % n === 0) {
                lists.push(list);
                list = new Array<IFeedOrder>();
            }
        }

        if (lists.length !== 0) {
            lists.push(list);
        }

        return lists;
    }

    return (
        <div className={styles.totalInfo}>
            <section className={styles.readyInfo}>
                <section className={styles.readyOrders}>
                    <p className="text text_type_main-medium">Готовы:</p>

                    <section className={styles.ordersLists}>
                        {
                            getGroupsPerN(doneOrders, 10).map((list, index) =>
                                <section
                                    key={index}
                                    className={styles.doneOrdersNumbers}>{list.map(order =>
                                    <Link key={order.number} to={`/feed/${order.number}`} state={{background: location}}
                                          className={styles.orderNumber}>{order.number}</Link>)}
                                </section>)
                        }
                    </section>

                </section>
                <section className={styles.orders}>
                    <p className="text text_type_main-medium">В работе:</p>

                    <section className={styles.ordersLists}>
                        {
                            getGroupsPerN(pendingOrders, 10).map((list, index) =>
                                <section
                                    key={index}
                                    className={styles.inWorkOrdersNumbers}>{list.map(order =>
                                    <Link key={order.number} to={`/feed/${order.number}`} state={{background: location}}
                                          className={styles.orderNumber}>{order.number}</Link>)}
                                </section>)
                        }
                    </section>
                </section>
            </section>
            <section className={styles.totalDone}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                {orders && <p className="text text_type_digits-medium">{orders.total}</p>}
            </section>
            <section className={styles.todayDone}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                {orders && <p className="text text_type_digits-medium">{orders.totalToday}</p>}
            </section>
        </div>
    )
}