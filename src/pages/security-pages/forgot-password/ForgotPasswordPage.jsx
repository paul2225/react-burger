import React, {useCallback} from 'react';
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../common-page.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {forgotPassword} from "../../../services/actions/security/forgotPassword";

function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');

    function handleChange(e) {
        setEmail(e.target.value);
    }

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const success = await dispatch(forgotPassword(email));

        if (success) {
            navigate('/reset-password'); // Перенаправляем при успешном входе
        }
    }, [dispatch, navigate, email]);

    return (
        <>
            <section className={styles.container}>
                <form className={styles.body} onSubmit={handleSubmit}>
                    <p className={styles.header}>Восстановление пароля</p>
                    <EmailInput
                        onChange={handleChange}
                        placeholder={'Укажите e-mail'}
                        value={email}
                        name={'email'}
                        isIcon={false}
                    />
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                    >
                        Восстановить
                    </Button>
                </form>
                <section className={styles.footerContainer}>
                    <p className={styles.bottomText}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
                </section>
            </section>
        </>
    )
}

export default ForgotPasswordPage;