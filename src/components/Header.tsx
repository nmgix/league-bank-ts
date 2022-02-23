import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-logo.svg";
import { ReactComponent as IconEnter } from "../images/icon-enter.svg";

export const Header: React.FC = () => {
  return (
    <header>
      <div className='container'>
        <div className='wrapper'>
          <Link className='logo' to='/'>
            <Logo />
            <span>ЛИГА Банк</span>
          </Link>
          <ul className='nav-list'>
            <li>
              <a href='#services'>Услуги</a>
            </li>
            <li>
              <a href='#calculate'>Рассчитать кредит</a>
            </li>
            <li>
              <a href='#contacts'>Контакты</a>
            </li>
            <li>
              <a href='#calculate'>Задать вопрос</a>
            </li>
          </ul>
          <button className='login-button'>
            <IconEnter />
            <span>Войти в Интернет-банк</span>
          </button>
        </div>
      </div>
    </header>
  );
};
