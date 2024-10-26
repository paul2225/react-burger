import styles from "./app-header.module.css";
import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function HeaderButton(props) {
    return (
        <Link className={styles.button} style={{textDecoration: 'none'}} to={props.link}>
            <div>
                {props.buttonIcon}
            </div>
            <p className="text text_type_main-default styles.buttonText">
                {props.buttonText}
            </p>
        </Link>
    )
}

HeaderButton.propTypes = {
    buttonIcon: PropTypes.element.isRequired,
    buttonText: PropTypes.string.isRequired,
}

export default HeaderButton;