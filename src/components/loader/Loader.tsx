import React from "react";
import styles from "./loader.module.css";

enum SizeType {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}

function Loader({size = SizeType.MEDIUM}: { size?: SizeType }) {
    return (
        <div className={`${styles.loaderContainer}`}>
            <div className={`${styles.spinner} ${styles[size]}`}></div>
        </div>
    );
}

export default Loader;