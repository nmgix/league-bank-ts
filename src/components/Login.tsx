import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-logo.svg";
import { useAction } from "../redux/hooks/useAction";
import { useTypedSelector } from "../redux/hooks/useTypedSelector";
import { CloseCross } from "./essentials/CloseCross";
import { Context } from "./essentials/ContextWraper";
import { InputConsumer } from "./essentials/InputConsumer";

export const Login: React.FC<{
  closeWindow: React.Dispatch<React.SetStateAction<boolean>>;
  forgotPassword: boolean;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ closeWindow, forgotPassword, setForgotPassword }) => {
  const context = useContext(Context);

  const { getUser, existsUser, resetPassword } = useAction();
  const authState = useTypedSelector((state) => state.auth);
  const searchState = useTypedSelector((state) => state.search);

  const [ableResetPassword, setAbleResetPassword] = useState<boolean>(false);

  const stopLogin = () => {
    setForgotPassword(false);
    closeWindow(false);
    context.resetState!();
  };

  const handleForgotPassword = (login: string, oldPassword: string, newPassword: string) => {
    if (existsUser(login)) {
      resetPassword(login, oldPassword, newPassword);
    }
  };

  useEffect(() => {
    if (authState.state !== null) {
      stopLogin();
    }
  }, [authState]);
  // да, два юзэффекта плохо
  useEffect(() => {
    if (searchState.searchUser !== null) {
      setAbleResetPassword(true);
    }
  }, [searchState]);

  const authUser = (login: string, password: string) => {
    getUser(login, password);
  };

  return (
    <div className='modal-login'>
      <div className='modal-login-header'>
        <Link className='logo' to='/'>
          <Logo />
          <span>ЛИГА Банк</span>
          <span>интернет банк</span>
        </Link>
        <CloseCross onClick={() => stopLogin()} />
      </div>
      {!forgotPassword ? (
        <>
          {authState.error !== null && <span>{authState.error}</span>}
          <div className='modal-login-main'>
            <InputConsumer inputName='login' type='text' initialValue={""} label={"Логин"} className='field-default' />
            <InputConsumer
              inputName='password'
              type='password'
              initialValue={""}
              label={"Пароль"}
              className='field-default'
            />
            <button onClick={() => setForgotPassword(true)}>Забыли пароль?</button>
          </div>
          <button
            className='button button-primary'
            onClick={() => authUser(context.state["login"].value, context.state["password"].value)}>
            Войти
          </button>
          <Link to={"/how-to-register"} onClick={() => closeWindow(false)}>
            У меня нет аккаунта
          </Link>
        </>
      ) : !ableResetPassword ? (
        <div className='modal-login-reset'>
          <div>
            <h2>Введите логин, почту или номер</h2>
            <span>Привязанный к аккаунту</span>
          </div>
          <InputConsumer inputName='login' type='text' initialValue={""} className='field-default' />
          {authState.error !== null && <span>{authState.error}</span>}
          <button className='button button-primary' onClick={() => existsUser(context.state["login"].value)}>
            Отправить
          </button>
        </div>
      ) : (
        <div className='modal-login-reset-password'>
          <InputConsumer
            inputName='old-password'
            type='password'
            initialValue={""}
            label={"Старый пароль"}
            className='field-default'
          />
          <InputConsumer
            inputName='new-password'
            type='password'
            initialValue={""}
            label={"Новый пароль"}
            className='field-default'
          />
          <button
            className='button button-primary'
            onClick={() =>
              handleForgotPassword(
                context.state["login"].value,
                context.state["old-password"].value,
                context.state["new-password"].value
              )
            }>
            Сменить пароль
          </button>
        </div>
      )}
    </div>
  );
};
