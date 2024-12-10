import React, {ReactNode} from 'react';
import styles from "./modal.module.css";

function ModalOverlay({content, close}: { content: ReactNode, close: () => void }) {
    return (
        <aside className={styles.modalOverlay} onClick={close}>
            {content}
        </aside>
    )
}

export default ModalOverlay;