import React, {useMemo} from 'react';
import {useDrop} from "react-dnd";
import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/OrderDetails";
import Modal from "../modal/Modal";
import Ingredient from "./Ingredient";
import {
    ADD_CONSTRUCTOR_INGREDIENT,
    UPDATE_CONSTRUCTOR_INGREDIENTS
} from "../../services/actions/constructor/constructorIngredients";
import {CLEAR_CREATED_ORDER, getCreatedOrder} from "../../services/actions/constructor/createdOrder";
import {useNavigate} from "react-router-dom";
import Loader from "../loader/Loader";
import Cookies from "js-cookie";
import {BunType, IIngredient, IIngredientElement, IngredientType} from "../../types/IIngredient";
import {useDispatch, useSelector} from "../../index";
import {calcBurgerPrice} from "../../utils/utils";

function BurgerConstructor() {
    const ingredients = useSelector(state => state.constructorIngredients.ingredients);
    const createdOrder = useSelector(state => state.createdOrder.order);
    const createdOrderRequest = useSelector(state => state.createdOrder.createdOrderRequest);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const moveIngredient = (draggedIndex: number, targetIndex: number) => {
        const updatedIngredients = [...ingredients];
        const [removed] = updatedIngredients.splice(draggedIndex, 1);
        updatedIngredients.splice(targetIndex, 0, removed);
        dispatch({type: UPDATE_CONSTRUCTOR_INGREDIENTS, ingredients: updatedIngredients});
    };

    const [, dropTarget] = useDrop({
        accept: ["ingredient", "constructorIngredient"],
        drop(item: IIngredientElement | IIngredient, monitor) {
            const itemType = monitor.getItemType();
            if (itemType === 'ingredient') {
                dispatch({type: ADD_CONSTRUCTOR_INGREDIENT, ingredient: item as IIngredient});
            } else if (itemType === 'constructorIngredient') {
                item = item as IIngredientElement;
                const monitorItem = monitor.getItem() as IIngredientElement
                const draggedIndex = item.index;
                const targetIndex = monitorItem.index;

                if (ingredients[targetIndex].type !== 'bun' && ingredients[draggedIndex].type !== 'bun') {
                    if (draggedIndex !== targetIndex) {
                        moveIngredient(draggedIndex, targetIndex);
                    }
                }
            }
        },
    });

    const totalSum = useMemo(() => calcBurgerPrice(ingredients),
        [ingredients]
    );

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const accessToken = Cookies.get('accessToken');

        if (accessToken === undefined) {
            return navigate('/login')
        }

        dispatch(getCreatedOrder(ingredients.map(ingredient => ingredient._id)))
    }

    return (
        <section className={styles.constructorStyle}>
            <div className={styles.ingredients} ref={dropTarget} data-testid="constructor-ingredient">
                {ingredients.map((ingredient, index) => {
                    let isDraggable = true;
                    let type: BunType | undefined = undefined;
                    let locked = false;
                    if (ingredient.type === IngredientType.BUN && (index === 0 || index === ingredients.length - 1)) {
                        type = index === 0 ? BunType.TOP : BunType.BOTTOM;
                        locked = true;
                        isDraggable = false;
                    }

                    return (
                        <Ingredient
                            key={ingredient._id + index}
                            index={index}
                            {...(type !== undefined && {type})}
                            isDraggable={isDraggable}
                            isLocked={locked}
                            ingredient={ingredient}
                            moveIngredient={moveIngredient}
                            data-testid="constructor-ingredient"
                        />
                    );
                })}
            </div>

            <form className={styles.orderDetails} onSubmit={handleSubmit}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">{totalSum}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button
                    data-testid="makeOrderButton"
                    htmlType="submit"
                    type="primary"
                    size="large"
                    disabled={ingredients.filter(ingredient => ingredient.type === 'bun').length === 0}
                >
                    Оформить заказ
                </Button>
            </form>
            {createdOrder != null
                && <Modal modal={<OrderDetails order={createdOrder}/>}
                          close={() => dispatch({type: CLEAR_CREATED_ORDER})}/>
            }
            {createdOrderRequest && <Loader/>}
        </section>
    )
}

export default BurgerConstructor;