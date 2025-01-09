import React from 'react';
import styles from './profile-page.module.css';
import NavigationLink from "../../components/utils/NavigationLink";
import {logout} from "../../services/actions/security/logout";
import {useDispatch} from "../../index";

function ProfilePage({content}: { content: React.ReactElement }) {
    const dispatch = useDispatch();

    return (
        <>
            <div className={styles.page}>
                <nav className={styles.navigation}>
                    <NavigationLink to={"/profile"} name={"Профиль"}/>
                    <NavigationLink to={"/profile/orders"} name={"История заказов"}/>
                    <NavigationLink onClick={() => dispatch(logout())} to={"/login"} name={"Выход"}/>
                    <p className={styles.navFooterText}>В этом разделе вы можете изменить
                        свои персональные данные</p>
                </nav>
                {content}
            </div>
        </>
    )
}

export default ProfilePage;
