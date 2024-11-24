import React, {useCallback, useEffect} from 'react';
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

    const handleSubmit = useCallback(async () => {
        const success = await dispatch(resetPassword(password, token));

        if (success) {
            navigate('/login');
        }
    }, [dispatch, navigate, password, token]);

    useEffect(() => {
        const handleEnterPress = (event) => {
            if (event.key === "Enter") {
                handleSubmit();
            }
        };

        document.addEventListener("keydown", handleEnterPress);
        return () => document.removeEventListener("keydown", handleEnterPress);
    }, [handleSubmit]);

    return (
        <>
            <section className={styles.container}>
                <section className={styles.body}>
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
                    <Button onClick={handleSubmit} htmlType="button" type="primary" size="large">
                        Сохранить
                    </Button>
                </section>
                <section className={styles.footerContainer}>
                    <p className={styles.bottomText}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
                </section>
            </section>
        </>
    )
}

export default PasswordResetPage;