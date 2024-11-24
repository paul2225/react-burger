import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsContainer from "./IngredientsContainer";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import {getIngredients} from "../../services/actions/constructor/ingredients";
import {REMOVE_VIEWED_INGREDIENT, SET_VIEWED_INGREDIENT} from "../../services/actions/constructor/viewedIngredient";
import {ingredientShape} from "../../types/IngredientPropTypes";

function BurgerIngredients(props) {
    const [current, setCurrent] = useState('bun');
    const viewedIngredient = useSelector(state => state.viewedIngredient.ingredient);
    const ingredientsByType = useSelector(state => state.ingredients.ingredientsByType);

    const dispatch = useDispatch();

    const ingredientsListRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const sectionRefs = useMemo(() => ({
        bun: bunRef,
        sauce: sauceRef,
        main: mainRef
    }), []);

    const typeNames = {
        bun: 'Булки',
        main: 'Начинки',
        sauce: 'Соусы'
    };

    useEffect(() => {
        dispatch(getIngredients());
        if (props.viewedIngredient != null) {
            dispatch({type: SET_VIEWED_INGREDIENT, viewedIngredient: props.viewedIngredient})
        }
    }, [dispatch, props.viewedIngredient]);

    const handleScroll = useCallback(() => {
        const sections = Object.keys(sectionRefs);
        let closestSection = sections[0];
        let closestDistance = Infinity;

        sections.forEach(section => {
            const sectionTop = sectionRefs[section].current.getBoundingClientRect().top;
            const containerTop = ingredientsListRef.current.getBoundingClientRect().top;
            const distance = Math.abs(sectionTop - containerTop);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
            }
        });

        setCurrent(closestSection);
    }, [sectionRefs]);

    useEffect(() => {
        const container = ingredientsListRef.current;
        container.addEventListener('scroll', handleScroll);

        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleTabClick = (type) => {
        setCurrent(type);
        sectionRefs[type].current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <>
            <p className={styles.header}>Соберите бургер</p>
            <div className={styles.tabs}>
                <Tab value="bun" active={current === 'bun'} onClick={() => handleTabClick('bun')}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={() => handleTabClick('sauce')}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={() => handleTabClick('main')}>Начинки</Tab>
            </div>
            <div ref={ingredientsListRef} className={styles.ingredientsList}>
                <div ref={bunRef} datatype="bun">
                    <IngredientsContainer header={typeNames.bun} ingredients={ingredientsByType.bun}/>
                </div>
                <div ref={sauceRef} datatype="sauce">
                    <IngredientsContainer header={typeNames.sauce} ingredients={ingredientsByType.sauce}/>
                </div>
                <div ref={mainRef} datatype="main">
                    <IngredientsContainer header={typeNames.main} ingredients={ingredientsByType.main}/>
                </div>
            </div>
            {viewedIngredient !== null &&
                <Modal
                    close={() => {
                        dispatch({type: REMOVE_VIEWED_INGREDIENT});
                        window.history.pushState({}, '', '/');
                    }}
                    modal={<IngredientDetails ingredient={viewedIngredient}/>}
                />
            }
        </>
    );
}

BurgerIngredients.propTypes = {
    viewedIngredient: ingredientShape.isRequired,
}

export default BurgerIngredients;