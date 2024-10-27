import styles from "./app-header.module.css";
import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function HeaderButton(props) {
    return (
        <Link className={styles.button} style={{textDecoration: 'none'}} to={props.link}>
            <span>{props.buttonIcon}</span>
            <p className="text text_type_main-default styles.buttonText">
                {props.buttonText}
            </p>
        </Link>
    )
}

HeaderButton.propTypes = {
    link: PropTypes.string.isRequired,
    buttonIcon: PropTypes.element.isRequired,
    buttonText: PropTypes.string.isRequired,
}

export default HeaderButton;