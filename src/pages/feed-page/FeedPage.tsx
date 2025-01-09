import styles from "./feed.module.css";
import React from "react";
import {OrdersFeed} from "../../components/orders-feed/feed/OrdersFeed";
import {OrdersSummary} from "../../components/orders-feed/summary/OrdersSummary";

function FeedPage() {
    return (
        <div className={styles.feedPage}>
            <section className={styles.ordersFeed}>
                <p className={styles.header}>Лента заказов</p>
                <OrdersFeed usersOrdersOnly={false}/>
            </section>
            <section className={styles.ordersSummary}>
                <OrdersSummary/>
            </section>
        </div>
    );
}

export default FeedPage;