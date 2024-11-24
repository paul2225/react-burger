import React from 'react';
import styles from './navigation-link.module.css';
import {useLocation, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function NavigationLink({to, name, onClick}) {
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

NavigationLink.propTypes = {
    to: PropTypes.string,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default NavigationLink;