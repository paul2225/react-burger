import React, {useEffect} from 'react';
import styles from './modal.module.css'
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay";

function Modal({modal, close}) {

    useEffect(() => {
        const handleEscPress = (event) => {
            if (event.key === "Escape") {
                close();
            }
        };

        document.addEventListener("keydown", handleEscPress);
        return () => document.removeEventListener("keydown", handleEscPress);
    }, [close]);

    return (
        ReactDOM.createPortal(
            <ModalOverlay
                content={
                    <section className={styles.modalContent}>
                        <button
                            className={styles.closeIcon}
                            onClick={close}
                            aria-label="Закрыть окно заказа"
                        >
                            <CloseIcon type="primary"/>
                        </button>
                        {modal}
                    </section>
                }
            />,
            document.getElementById("modal")
        )
    )
}

Modal.propTypes = {
    modal: PropTypes.element.isRequired,
    close: PropTypes.func.isRequired,
}

export default Modal;