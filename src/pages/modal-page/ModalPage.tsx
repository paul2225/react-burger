import styles from "./modal-page.module.css";
import {ReactNode} from "react";

function ModalPage({content}: { content: ReactNode }) {
    return (
        <section className={styles.modalPage}>
            {content}
        </section>
    );
}

export default ModalPage;