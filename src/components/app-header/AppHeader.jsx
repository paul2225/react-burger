import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'
import HeaderButton from "./HeaderButton";
import {Link} from "react-router-dom";

function AppHeader() {
    return (
        <header className={styles.overlay}>
            <div className={styles.header}>
                <div className={styles.leftButtons}>
                    <HeaderButton
                        buttonIcon={<BurgerIcon type="secondary"/>}
                        buttonText="Конструктор"
                        link={'/constructor'}
                    />
                    <HeaderButton
                        buttonIcon={<ListIcon type="secondary"/>}
                        buttonText="Лента заказов"
                        link={'/feed'}
                    />
                </div>
                <Link to={'/'}>
                    <Logo/>
                </Link>
                <div className={styles.rightButtons}>
                    <HeaderButton buttonIcon={<ProfileIcon type="secondary"/>} buttonText="Личный кабинет"
                                  link={'/me'}/>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;