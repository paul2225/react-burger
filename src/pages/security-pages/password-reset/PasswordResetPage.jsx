import React, {useCallback} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../common-page.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {resetPassword} from "../../../services/actions/security/resetPassword";

function PasswordResetPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleTokenChange(e) {
        setToken(e.target.value);
    }

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const success = await dispatch(resetPassword(password, token));

        if (success) {
            navigate('/login');
        }
    }, [dispatch, navigate, password, token]);

    return (
        <>
            <section className={styles.container}>
                <form className={styles.body} onSubmit={handleSubmit}>
                    <p className={styles.header}>Восстановление пароля</p>
                    <PasswordInput
                        onChange={handlePasswordChange}
                        value={password}
                        name={'password'}
                        extraClass="mb-2"
                        placeholder={'Введите новый пароль'}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={handleTokenChange}
                        value={token}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                    <Button htmlType="submit" type="primary" size="large">
                        Сохранить
                    </Button>
                </form>
                <section className={styles.footerContainer}>
                    <p className={styles.bottomText}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
                </section>
            </section>
        </>
    )
}

export default PasswordResetPage;