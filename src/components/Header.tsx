import React, { createRef, useEffect, useRef, useState, RefObject } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-logo.svg";
import { ReactComponent as IconEnter } from "../images/icon-enter.svg";
import { Modal } from "./Modal";

import { navigateTo } from "../functions/NavigateTo";

const CloseCross: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div onClick={onClick} className='close-cross'>
      <div className='line'></div>
      <div className='line'></div>
    </div>
  );
};

const BurgerMenu: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div onClick={onClick} className='burger-menu'>
      <div className='line'></div>
      <div className='line'></div>
      <div className='line'></div>
    </div>
  );
};

export const Header: React.FC = () => {
  const [activeNavbar, setActiveNavbar] = useState<boolean>(false);
  const [activeLogin, setActiveLogin] = useState<boolean>(false);

  return (
    <header>
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
            <a href='#' onClick={() => navigateTo("contacts")}>
              Контакты
            </a>
          </li>
          <li>
            <a href='#' onClick={() => navigateTo("contacts")}>
              Задать вопрос
            </a>
          </li>
        </ul>
      </Modal>
      <Modal
        active={activeLogin}
        setActive={setActiveLogin}
        parentClassName={`modal-login ${activeLogin ? "modal-login-active" : ""}`}>
        <CloseCross onClick={() => setActiveLogin(false)} />
        <input />
        <div>
          <input />
          <button>Забыли пароль?</button>
        </div>
        <button className='button button-primary'>Войти</button>
      </Modal>
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
              <a href='#' onClick={() => navigateTo("contacts")}>
                Контакты
              </a>
            </li>
            <li>
              <a href='#' onClick={() => navigateTo("contacts")}>
                Задать вопрос
              </a>
            </li>
          </ul>
          <button className='login-button' onClick={() => setActiveLogin(true)}>
            <IconEnter />
            <span className='help-text'>Войти в Интернет-банк</span>
          </button>
        </div>
      </div>
    </header>
  );
};
