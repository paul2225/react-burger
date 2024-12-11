import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsContainer from "./IngredientsContainer";
import {IngredientType} from "../../types/IIngredient";
import {useAppSelector} from "../../index";

type TIngredientsRefs = {
    [IngredientType.BUN]: React.RefObject<HTMLDivElement>
    [IngredientType.SAUCE]: React.RefObject<HTMLDivElement>
    [IngredientType.MAIN]: React.RefObject<HTMLDivElement>
};

function BurgerIngredients() {
    const [current, setCurrent] = useState(IngredientType.BUN);
    const ingredientsByType = useAppSelector(state => state.ingredients.ingredientsByType);

    const ingredientsListRef = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const sectionRefs = useMemo<TIngredientsRefs>(() => ({
        bun: bunRef,
        sauce: sauceRef,
        main: mainRef
    }), []);

    const typeNames = {
        [IngredientType.BUN]: 'Булки',
        [IngredientType.MAIN]: 'Начинки',
        [IngredientType.SAUCE]: 'Соусы'
    };

    const ingredientTypes = Object.values(IngredientType);

    const handleScroll = useCallback(() => {
        const sections: ReadonlyArray<IngredientType> = ingredientTypes;
        let closestSection: IngredientType = sections[0];
        let closestDistance: number = Infinity;

        sections.forEach(section => {
            const sectionTop: number = sectionRefs[section].current?.getBoundingClientRect().top!;
            const containerTop: number = ingredientsListRef.current?.getBoundingClientRect().top!;
            const distance: number = Math.abs(sectionTop - containerTop);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
            }
        });

        setCurrent(closestSection);
    }, [sectionRefs, ingredientTypes]);

    useEffect(() => {
        const container: HTMLDivElement = ingredientsListRef.current!;
        container.addEventListener('scroll', handleScroll);

        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleTabClick = (type: IngredientType) => {
        setCurrent(type);
        sectionRefs[type].current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <>
            <p className={styles.header}>Соберите бургер</p>
            <div className={styles.tabs}>
                {ingredientTypes.map((ingredientType, index) =>
                    <Tab key={index} value={ingredientType} active={current === ingredientType}
                         onClick={() => handleTabClick(ingredientType)}>{typeNames[ingredientType]}</Tab>)}
            </div>
            <div ref={ingredientsListRef} className={styles.ingredientsList}>
                {ingredientTypes.map((ingredientType, index) =>
                    <div key={index} ref={sectionRefs[ingredientType]} datatype={ingredientType}>
                        <IngredientsContainer header={typeNames[ingredientType]}
                                              ingredients={ingredientsByType[ingredientType]}/>
                    </div>
                )}
            </div>
        </>
    );
}

export default BurgerIngredients;