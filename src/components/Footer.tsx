import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-logo.svg";
import { ReactComponent as MobileIcon } from "../images/icon-mobile.svg";
import { ReactComponent as PhoneIcon } from "../images/icon-phone.svg";

import { ReactComponent as FacebookIcon } from "../images/icon-fb.svg";
import { ReactComponent as InstagramIcon } from "../images/icon-ig.svg";
import { ReactComponent as TwitterIcon } from "../images/icon-twitter.svg";
import { ReactComponent as YoutubeIcon } from "../images/icon-youtube.svg";

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className='container background-limit'>
        <div className='credentials'>
          <Link className='logo' to='/'>
            <Logo />
            <span>ЛИГА Банк</span>
          </Link>
          <p>150015, г. Москва, ул. Московская, д. 32 Генеральная лицензия Банка России №1050 © Лига Банк, 2022</p>
        </div>
        <div className='list'>
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
        </div>
        <div className='phone-short'>
          <a href='tel:*0904'>
            <MobileIcon /> *0904
          </a>
          <p>Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2</p>
        </div>
        <div className='phone'>
          <a href='tel:88001112233'>
            <PhoneIcon /> 8 800 111 22 33
          </a>
          <p>Бесплатный для всех городов России</p>
        </div>
        <div className='social'>
          <ul>
            <li>
              <a>
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a>
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a>
                <TwitterIcon />
              </a>
            </li>
            <li>
              <a>
                <YoutubeIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
