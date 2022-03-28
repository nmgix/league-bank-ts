import React, { createRef, useEffect, useRef, useState, RefObject } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-logo.svg";
import { ReactComponent as IconEnter } from "../images/icon-enter.svg";
import { Modal } from "./essentials/Modal";

import { navigateTo } from "../functions/NavigateTo";
import { ContextWraper } from "./essentials/ContextWraper";
import { BackgorundBlackout } from "./essentials/BackgorundBlackout";
import { CloseCross } from "./essentials/CloseCross";
import { BurgerMenu } from "./essentials/BurgerMenu";
import { Login } from "./Login";
import { useTypedSelector } from "../redux/hooks/useTypedSelector";
import { ImagePlacholder } from "./essentials/ImagePlacholder";
import { useAction } from "../redux/hooks/useAction";

export const Header: React.FC = () => {
  const [activeNavbar, setActiveNavbar] = useState<boolean>(false);
  const [activeLogin, setActiveLogin] = useState<boolean>(false);

  const [forgotPassword, setForgotPassword] = useState<boolean>(false);

  const authState = useTypedSelector((state) => state.auth);
  const { resetState } = useAction();

  return (
    <header>
      {activeNavbar && (
        <Modal
          active={activeNavbar}
          setActive={setActiveNavbar}
          parentClassName={`nav ${activeNavbar ? "nav-active" : ""}`}>
          <CloseCross onClick={() => setActiveNavbar(false)} />
          <ul className='nav-list'>
            <li>
              <a href='#' onClick={() => navigateTo("services")}>
                Услуги
              </a>
            </li>
            <li>
              <a href='#' onClick={() => navigateTo("calculate")}>
                Рассчитать кредит
              </a>
            </li>
            <li>
              <Link to={"contacts"}>Контакты</Link>
            </li>
            <li>
              <Link to={"faq"}>Задать вопрос</Link>
            </li>
          </ul>
        </Modal>
      )}
      <ContextWraper>
        {activeLogin && (
          <Modal
            active={activeLogin}
            setActive={setActiveLogin}
            onCloseCallback={() => setForgotPassword(false)}
            parentClassName={`modal ${activeLogin ? "modal-active" : ""}`}
            dependencyValues={[forgotPassword]}
            style={{ top: "36vh" }}
            zIndex={4}>
            <Login closeWindow={setActiveLogin} forgotPassword={forgotPassword} setForgotPassword={setForgotPassword} />
          </Modal>
        )}
      </ContextWraper>
      {activeLogin && <BackgorundBlackout zIndex={3} opacity={50} /*blur={5}*/ />}
      <div className='container'>
        <div className='wrapper'>
          <BurgerMenu onClick={() => setActiveNavbar(true)} />
          <Link className='logo' to='/'>
            <Logo />
            <span>ЛИГА Банк</span>
          </Link>
          <ul className='nav-list'>
            <li>
              <a href='#' onClick={() => navigateTo("services")}>
                Услуги
              </a>
            </li>
            <li>
              <a href='#' onClick={() => navigateTo("calculate")}>
                Рассчитать кредит
              </a>
            </li>
            <li>
              <Link to={"contacts"}>Контакты</Link>
            </li>
            <li>
              <Link to={"faq"}>Задать вопрос</Link>
            </li>
          </ul>
          {authState.state && authState.state.id !== null ? (
            <div className='user-miniature'>
              <Link to={"/home"}>
                <ImagePlacholder width={35} height={35} rounded={true} />
              </Link>
              <div>
                <Link to={"/home"}>
                  <span>{`${authState.state.names.second} ${authState.state.names.first}`}</span>
                </Link>

                <button onClick={() => resetState()}>Выйти →</button>
                {/* Да, лучше не использовать юникод, но так всем проще */}
              </div>
            </div>
          ) : (
            <button className='login-button' onClick={() => setActiveLogin(true)}>
              <IconEnter />
              <span className='help-text'>Войти в Интернет-банк</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
