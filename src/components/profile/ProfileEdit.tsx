import styles from "../../pages/profile-page/profile-page.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
import {getUserInfo} from "../../services/actions/profile/getUserInfo";
import {useDispatch, useSelector} from "../../index";
import {saveUserInfo} from "../../services/actions/profile/saveUserInfo";

export function ProfileEdit(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    const userInfo = useSelector(state => state.getUserInfo.userInfo);

    const [buttonMode, setButtonMode] = useState<{ [name: string]: boolean }>({
        'name': true,
        'email': true
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    const [oldName, setOldName] = useState('')
    const [oldEmail, setOldEmail] = useState('')

    function dataChanged() {
        return name !== oldName || password !== '' || email !== oldEmail
    }

    function restoreData() {
        setName(oldName)
        setEmail(oldEmail)
    }

    function saveData() {
        if (dataChanged()) {
            dispatch(saveUserInfo(name, email, password))
                .then(() => dispatch(getUserInfo()))
        }
    }

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name || '');
            setEmail(userInfo.email || '');
            setOldName(userInfo.name || '');
            setOldEmail(userInfo.email || '')
        }
    }, [userInfo]);

    function changeButtonMode(btnName: string) {
        setButtonMode({...buttonMode, [btnName]: !buttonMode[btnName]})
    }
    return(
        <>
            <section className={styles.profileInfo}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    icon="EditIcon"
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={buttonMode['name']}
                    onIconClick={() => changeButtonMode('name')}
                />
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    icon="EditIcon"
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={buttonMode['email']}
                    onIconClick={() => changeButtonMode('email')}
                />
                <PasswordInput
                    name={'password'}
                    placeholder={'Пароль'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={false}
                />
            </section>
            {dataChanged() && (
                <div className={styles.buttons}>
                    <Button htmlType="button" type="secondary" size="medium" onClick={restoreData}>
                        Отмена
                    </Button>
                    <Button htmlType="button" type="primary" size="medium" onClick={saveData}>
                        Сохранить
                    </Button>
                </div>
            )}
        </>
    )
}