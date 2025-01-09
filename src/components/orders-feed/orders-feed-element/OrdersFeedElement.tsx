import styles from './orders-feed-element.module.css'
import {IFeedOrder} from "../../../types/IOrder";
import {useSelector} from "../../../index";
import {calcBurgerPrice} from "../../../utils/utils";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from "react-router-dom";
import {IIngredient} from "../../../types/IIngredient";

export function OrdersFeedElement({order}: { order: IFeedOrder }) {
    const location = useLocation();
    const ingredientsById = useSelector(state => state.ingredients.ingredientsById)
    const ingredients = order.ingredients
        .filter(ingredient => ingredient)
        .map(ingredient => ingredientsById[ingredient])

    const price = calcBurgerPrice(ingredients);

    return (
        <Link to={`/feed/${order.number}`} state={{background: location}} className={styles.orderFeedElement}>
            <section className={styles.top}>
                <p className={styles.orderNumber}>#{order.number}</p>
                <FormattedDate className={styles.createdAt} date={new Date(order.createdAt)}/>
            </section>
            <p className={styles.header}>{order.name}</p>
            <div className={styles.footer}>
                <section className={styles.ingredients}>
                    {
                        ingredients
                            .slice(0, 5)
                            .map((ingredient, index) =>
                                <img
                                    key={index}
                                    className={styles.ingredient}
                                    src={ingredient.image}
                                    alt={ingredient.name}
                                />
                            )
                    }
                    {
                        ingredients.length > 5 && fadedIngredientWithNumber(ingredients[5], ingredients.length - 5)
                    }
                </section>
                <section className={styles.price}>{price} <CurrencyIcon type="primary"/></section>
            </div>
        </Link>
    )
}

function fadedIngredientWithNumber(ingredient: IIngredient, number: number) {
    return (
        <section className={styles.fadedIngredientSection}>
            <img className={styles.fadedIngredient} src={ingredient.image} alt={ingredient.name}/>
            <p className={styles.fadedIngredientNumber}>+{number}</p>
        </section>
    )
}