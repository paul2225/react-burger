import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'
import HeaderButton from "./HeaderButton";
import {Link} from "react-router-dom";

function AppHeader() {
    return (
        <section className={styles.overlay}>
            <header className={styles.header}>
                <nav className={styles.leftButtons}>
                    <HeaderButton
                        buttonIcon={<BurgerIcon type="secondary"/>}
                        buttonText="Конструктор"
                        link={'/'}
                    />
                    <HeaderButton
                        buttonIcon={<ListIcon type="secondary"/>}
                        buttonText="Лента заказов"
                        link={'/feed'}
                    />
                </nav>
                <Link to={'/'}>
                    <Logo/>
                </Link>
                <nav className={styles.rightButtons}>
                    <HeaderButton buttonIcon={<ProfileIcon type="secondary"/>} buttonText="Личный кабинет"
                                  link={'/profile'}/>
                </nav>
            </header>
        </section>
    );
}

export default AppHeader;