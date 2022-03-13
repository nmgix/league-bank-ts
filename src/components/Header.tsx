import React, { createRef, useEffect, useRef, useState, RefObject } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-logo.svg";
import { ReactComponent as IconEnter } from "../images/icon-enter.svg";
import { navigateTo } from "../pages/Home";

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

const Navbar: React.FC<{ active: boolean; setActive: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  active,
  setActive,
}) => {
  // const navRef = createRef<HTMLElement>();

  const navRef = createRef<HTMLElement>();

  // @ https://usehooks-ts.com/react-hook/use-on-click-outside

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const el = navRef.current;
      if (el && !el.contains(event.target as Node)) {
        setActive(false);
        return;
      }
    };
    if (active) {
      document.addEventListener("mouseup", clickHandler);
    }
    return () => {
      document.removeEventListener("mouseup", clickHandler);
    };
  }, [active]);

  return (
    <nav className={active ? "nav-active" : ""} ref={navRef}>
      <CloseCross onClick={() => setActive(false)} />
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
      {/* <button className='login-button'>
        <IconEnter />
        <span>Войти в Банк</span>
      </button> */}
    </nav>
  );
};

export const Header: React.FC = () => {
  const [activeNavbar, setActiveNavbar] = useState<boolean>(false);

  return (
    <header>
      <Navbar active={activeNavbar} setActive={setActiveNavbar} />
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
          <button className='login-button'>
            <IconEnter />
            <span className='help-text'>Войти в Интернет-банк</span>
          </button>
        </div>
      </div>
    </header>
  );
};
