import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-logo.svg";
import { CloseCross } from "./essentials/CloseCross";
import { Context } from "./essentials/ContextWraper";
import { InputConsumer } from "./essentials/InputConsumer";

export const Login: React.FC<{
  closeWindow: React.Dispatch<React.SetStateAction<boolean>>;
  forgotPassword: boolean;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ closeWindow, forgotPassword, setForgotPassword }) => {
  const context = useContext(Context);

  return (
    <div className='modal-login'>
      <div className='modal-login-header'>
        <Link className='logo' to='/'>
          <Logo />
          <span>ЛИГА Банк</span>
          <span>интернет банк</span>
        </Link>
        <CloseCross
          onClick={() => {
            setForgotPassword(false);
            closeWindow(false);
            context.resetState!();
          }}
        />
      </div>
      {!forgotPassword ? (
        <>
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
          <button className='button button-primary'>Войти</button>
          <Link to={"/how-to-register"} onClick={() => closeWindow(false)}>
            У меня нет аккаунта
          </Link>
        </>
      ) : (
        <div className='modal-login-reset'>
          <div>
            <h2>Введите логин, почту или номер</h2>
            <span>Привязанный к аккаунту</span>
          </div>
          <InputConsumer inputName='login' type='text' initialValue={""} className='field-default' />
          <button className='button button-primary'>Отправить</button>
        </div>
      )}
    </div>
  );
};
