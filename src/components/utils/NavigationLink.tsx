import React from 'react';
import styles from './navigation-link.module.css';
import {useLocation, useNavigate} from "react-router-dom";

function NavigationLink({to, name, onClick}: { to: string, name: string, onClick?: Function }) {
    const location = useLocation();
    const navigate = useNavigate();

    function handleClick() {
        if (!!onClick) {
            onClick()
        }

        if (!!to) {
            navigate(to)
        }
    }

    return location.pathname === to
        ? (<p className={styles.activeLink}>{name}</p>)
        : (<p className={styles.inactiveLink} onClick={handleClick}>{name}</p>);
}

export default NavigationLink;