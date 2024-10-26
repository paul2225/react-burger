import React from 'react';
import styles from './modal.module.css'
import PropTypes from "prop-types";

function Modal(props) {
    return (
        <div className={styles.modalOverlay}>{props.modal}</div>
    )
}

Modal.propTypes = {
    modal: PropTypes.element.isRequired
}

export default Modal;