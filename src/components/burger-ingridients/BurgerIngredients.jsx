import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsContainer from "./IngredientsContainer";
import ReactDOM from "react-dom";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import PropTypes from "prop-types";

function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('one')
    const [chosenIngridientId, setChosenIngredientId] = React.useState(-1)

    const ingredientsByType = {
        bun: props.ingredients.filter(item => item.type === 'bun'),
        main: props.ingredients.filter(item => item.type === 'main'),
        sauce: props.ingredients.filter(item => item.type === 'sauce')
    }

    const ingredientsById = {}

    props.ingredients.forEach(item => ingredientsById[item._id] = item);

    const typeNames = {
        bun: 'Булки',
        main: 'Начинки',
        sauce: 'Соусы'
    }

    return (
        <>
            <p className={styles.header} onClick={() => setChosenIngredientId(1)}>
                Соберите бургер
            </p>
            <div className={styles.tabs} style={{display: 'flex'}}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
            </div>
            <div className={styles.ingredientsList}>
                {
                    Object.entries(ingredientsByType)
                        .map(([type, items]) =>
                            <IngredientsContainer
                                key={type}
                                chooseIngredient={(id) => setChosenIngredientId(id)}
                                header={typeNames[type]}
                                items={items}
                            />
                        )
                }
            </div>
            {chosenIngridientId !== -1 && ReactDOM.createPortal(
                <Modal
                    modal={<IngredientDetails
                        ingredient={ingredientsById[chosenIngridientId]}
                        close={() => setChosenIngredientId(-1)}
                    />}
                />,
                document.getElementById("modal")
            )}
        </>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.array.isRequired
}

export default BurgerIngredients;