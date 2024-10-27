import React from 'react';
import styles from "./modal.module.css";
import PropTypes from "prop-types";

function ModalOverlay(props) {
    return (
        <aside className={styles.modalOverlay}>
            {props.content}
        </aside>
    )
}

ModalOverlay.propTypes = {
    content: PropTypes.element.isRequired
}

export default ModalOverlay;