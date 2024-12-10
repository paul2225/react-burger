import styles from "./app-header.module.css";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import {ReactElementLike} from "prop-types";

function HeaderButton({link, buttonIcon, buttonText}: IButtonProps) {
    const location = useLocation();

    return (
        <Link className={styles.button} style={{textDecoration: 'none'}} to={link}>
            <span>{buttonIcon}</span>
            {
                (location.pathname === '/' && link === '/') || (link !== '/' && location.pathname.includes(link))
                    ? (<p className={styles.activeLink}>{buttonText}</p>)
                    : (<p className={styles.inactiveLink}>{buttonText}</p>)
            }
        </Link>
    )
}

interface IButtonProps {
    readonly link: string,
    readonly buttonIcon: ReactElementLike,
    readonly buttonText: string
}

export default HeaderButton;