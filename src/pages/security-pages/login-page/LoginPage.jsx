import React, {useCallback, useEffect} from 'react';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../common-page.module.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../../services/actions/security/login";

function LoginPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const location = useLocation()

    const handleSubmit = useCallback(async () => {
        const result = await dispatch(login(email, password))
        if (result) {
            navigate(location.state?.targetPath || '/')
        }
    }, [dispatch, navigate, location.state, email, password]);

    useEffect(() => {
        const handleEnterPress = (event) => {
            if (event.key === "Enter") {
                handleSubmit();
            }
        };

        document.addEventListener("keydown", handleEnterPress);
        return () => document.removeEventListener("keydown", handleEnterPress);
    }, [handleSubmit]);

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <>
            <section className={styles.container}>
                <section className={styles.body}>
                    <p className={styles.header}>Вход</p>
                    <EmailInput
                        onChange={handleEmailChange}
                        placeholder={'Email'}
                        value={email || ''}
                        name={'email'}
                        isIcon={false}
                    />
                    <PasswordInput
                        onChange={handlePasswordChange}
                        value={password || ''}
                        name={'Пароль'}
                        extraClass="mb-2"
                    />
                    <Button htmlType="button" type="primary" size="large" onClick={handleSubmit}>
                        Войти
                    </Button>
                </section>
                <section className={styles.footerContainer}>
                    <p className={styles.bottomText}>Вы - новый пользователь? <Link
                        to="/register">Зарегистрироваться</Link></p>
                    <p className={styles.bottomText}>Забыли пароль? <Link
                        to="/forgot-password">Восстановить пароль</Link></p>
                </section>
            </section>
        </>
    )
}

export default LoginPage;