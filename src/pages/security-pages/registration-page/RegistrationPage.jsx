import React, {useCallback, useEffect} from 'react';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../common-page.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registration} from "../../../services/actions/security/registration";

function RegistrationPage() {
    const dispatch = useDispatch();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = useCallback(async () => {
        const result = dispatch(registration(name, email, password))
        if (result) {
            navigate('/login')
        }
    }, [navigate, dispatch, name, email, password]);

    useEffect(() => {
        const handleEnterPress = (event) => {
            if (event.key === "Enter") {
                handleSubmit();
            }
        };

        document.addEventListener("keydown", handleEnterPress);
        return () => document.removeEventListener("keydown", handleEnterPress);
    }, [handleSubmit]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

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
                    <p className={styles.header}>Регистрация</p>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleNameChange}
                        value={name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                    <EmailInput
                        onChange={handleEmailChange}
                        placeholder={'Email'}
                        value={email}
                        name={'email'}
                        isIcon={false}
                    />
                    <PasswordInput
                        onChange={handlePasswordChange}
                        value={password}
                        name={'Пароль'}
                        extraClass="mb-2"
                    />
                    <Button htmlType="button" type="primary" size="large" onClick={handleSubmit}>
                        Зарегистрироваться
                    </Button>
                </section>
                <section className={styles.footerContainer}>
                    <p className={styles.bottomText}>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
                </section>
            </section>
        </>
    )
}

export default RegistrationPage;