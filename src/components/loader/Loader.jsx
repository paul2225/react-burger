import React from "react";
import styles from "./loader.module.css";
import PropTypes from "prop-types";

function Loader({size = "medium"}) {
    return (
        <div className={`${styles.loaderContainer}`}>
            <div className={`${styles.spinner} ${styles[size]}`}></div>
        </div>
    );
}

Loader.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large"]),
    message: PropTypes.string,
};

export default Loader;