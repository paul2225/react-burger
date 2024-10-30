import React from 'react';
import styles from "./modal.module.css";
import PropTypes from "prop-types";

function ModalOverlay({content, close}) {
    return (
        <aside className={styles.modalOverlay} onClick={close}>
            {content}
        </aside>
    )
}

ModalOverlay.propTypes = {
    content: PropTypes.element.isRequired
}

export default ModalOverlay;