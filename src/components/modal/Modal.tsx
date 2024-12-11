import React, {ReactNode, useEffect} from 'react';
import styles from './modal.module.css'
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay";

const stopPropagation = (event: React.MouseEvent<HTMLElement>) => event.stopPropagation();

function Modal({modal, close}: { modal: ReactNode, close: () => void }) {

    useEffect(() => {
        const handleEscPress = (event: KeyboardEvent) => {
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
                close={close}
                content={
                    <section className={styles.modalContent} onClick={stopPropagation}>
                        <>
                            <button
                                className={styles.closeIcon}
                                onClick={close}
                                aria-label="Закрыть окно заказа"
                            >
                                <CloseIcon type="primary"/>
                            </button>
                            {modal}
                        </>
                    </section>
                }
            />,
            document.getElementById("modal")!
        )
    )
}

export default Modal;