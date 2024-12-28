import {useParams} from "react-router-dom";
import {useSelector} from "../../../index";
import Loader from "../../loader/Loader";
import styles from './completed-order-details.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useMemo, useState} from "react";
import {IFeedOrder, OrderStatusDescription} from "../../../types/IOrder";
import {calcBurgerPrice} from "../../../utils/utils";
import {requestWithAuth} from "../../../utils/requests";

function CompletedOrderDetails() {
    const {id} = useParams<{ id: string }>();
    const ingredientsById = useSelector(state => state.ingredients.ingredientsById)
    const [order, setOrder] = useState<IFeedOrder | null>(null)

    useEffect(() => {
        async function fetchOrder() {
            const response = await requestWithAuth(`orders/${id}`, "GET");
            if (response.success) {
                setOrder(response.orders[0])
            }
        }

        fetchOrder();
    }, [id]);

    const orderPrice = useMemo(() =>
            order
                ? calcBurgerPrice(order.ingredients.map(ingredient => ingredientsById[ingredient]))
                : 0,
        [order, ingredientsById]
    )

    if (!order) {
        return <Loader/>
    }

    const ingredientWithCount = order.ingredients.reduce((acc: Record<string, number>, ingredient) => {
        acc[ingredient] = (acc[ingredient] || 0) + 1;
        return acc;
    }, {})

    return (
        <div className={styles.completedOrderDetails}>
            <p className={styles.orderNumber}>#{order.number}</p>
            <p className={styles.orderName}>{order.name}</p>
            <p className={styles.orderStatus}>{OrderStatusDescription[order.status]}</p>
            <p className={styles.orderCompositionHeader}>Состав:</p>
            <section className={styles.orderCompositionList}>
                {Object.entries(ingredientWithCount)
                    .map(([ingredient, count]) => <IngredientDetailsShort key={ingredient} ingredientId={ingredient}
                                                                          count={count}/>)}
            </section>
            <section className={styles.footer}>
                <FormattedDate className={styles.createdAt} date={new Date(order.createdAt)}/>
                <p className={styles.orderPrice}>{orderPrice} <CurrencyIcon type="primary"/></p>
            </section>
        </div>
    )
}

function IngredientDetailsShort({ingredientId, count}: { ingredientId: string, count: number }) {
    const ingredientsById = useSelector(state => state.ingredients.ingredientsById);
    const ingredient = ingredientsById[ingredientId];

    return (
        <div className={styles.ingredientsDetailsShort}>
            <section className={styles.leftSide}>
                <img className={styles.ingredientsImage} src={ingredient.image} alt={ingredient.name}/>
                <p className={styles.ingredientsName}>{ingredient.name}</p>
            </section>
            <section className={styles.rightSide}>
                <p className={styles.ingredientsPrice}>{count} X {ingredient.price} <CurrencyIcon type="primary"/></p>
            </section>
        </div>
    )
}

export default CompletedOrderDetails;