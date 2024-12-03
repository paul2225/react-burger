import styles from "./app-header.module.css";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import PropTypes from "prop-types";

function HeaderButton(props) {
    const location = useLocation();

    return (
        <Link className={styles.button} style={{textDecoration: 'none'}} to={props.link}>
            <span>{props.buttonIcon}</span>
            {
                (location.pathname === '/' && props.link === '/') || (props.link !== '/' && location.pathname.includes(props.link))
                    ? (<p className={styles.activeLink}>{props.buttonText}</p>)
                    : (<p className={styles.inactiveLink}>{props.buttonText}</p>)
            }
        </Link>
    )
}

HeaderButton.propTypes = {
    link: PropTypes.string.isRequired,
    buttonIcon: PropTypes.element.isRequired,
    buttonText: PropTypes.string.isRequired,
}

export default HeaderButton;