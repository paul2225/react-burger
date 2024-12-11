import React, {useCallback} from 'react';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../common-page.module.css";
import {Link, useNavigate} from "react-router-dom";
import {registration} from "../../../services/actions/security/registration";
import {useAppDispatch} from "../../../index";

function RegistrationPage() {
    const dispatch = useAppDispatch();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await dispatch(registration(name, email, password))
        if (result) {
            navigate('/login')
        }
    }, [navigate, dispatch, name, email, password]);

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    return (
        <>
            <section className={styles.container}>
                <form className={styles.body} onSubmit={handleSubmit}>
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
                    <Button htmlType="submit" type="primary" size="large">
                        Зарегистрироваться
                    </Button>
                </form>
                <section className={styles.footerContainer}>
                    <p className={styles.bottomText}>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
                </section>
            </section>
        </>
    )
}

export default RegistrationPage;