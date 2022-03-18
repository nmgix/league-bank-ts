import React from "react";

import { SwiperComponent } from "../components/essentials/SwiperComponent";

import { Calculator } from "../components/Home/Calculator";
import { Map } from "../components/Home/Map";
import { Services } from "../components/Home/Services";

import Cards from "../images/cards.webp";
import Man from "../images/man.webp";
import Woman from "../images/woman.webp";

import PiggyBank from "../images/piggybank.webp";
import Car from "../images/car.webp";
import Security from "../images/lock.webp";
import MobileApp from "../images/mobile.webp";

import { ReactComponent as VaultIcon } from "../images/vault.svg";
import { ReactComponent as DebtsIcon } from "../images/cards.svg";
import { ReactComponent as InsuranceIcon } from "../images/security.svg";
import { ReactComponent as PhoneIcon } from "../images/phone.svg";

import { navigateTo } from "../functions/NavigateTo";

export const Home: React.FC = () => {
  // @ https://stackoverflow.com/questions/55376257/how-to-navigate-to-a-particular-div-on-the-same-page-in-reactjs?lq=1

  const heroSlides: React.ReactNode[] = [
    <div className='swiper-slide' id='slide0'>
      <div className='slide-wrapper'>
        <div className='info'>
          <h1>Лига Банк</h1>
          <h3>Кредиты на любой случай</h3>
          <button className='button button-primary-inv' onClick={() => navigateTo("calculate")}>
            Рассчитать кредит
          </button>
        </div>
        <img src={Cards} draggable='false' />
      </div>
    </div>,
    <div className='swiper-slide' id='slide1'>
      <div className='slide-wrapper'>
        <div className='info'>
          <h1>Лига Банк</h1>
          <h3>Ваша уверенность в завтрашнем дне</h3>
        </div>
        <img src={Man} className='img-fwfh' draggable='false' />
      </div>
    </div>,
    <div className='swiper-slide' id='slide2'>
      <div className='slide-wrapper'>
        <div className='info'>
          <h1>Лига Банк</h1>
          <h3>Всегда рядом</h3>
          <button className='button button-primary' onClick={() => navigateTo("map")}>
            Найти отделение
          </button>
        </div>
        <img src={Woman} className='img-fwfh' draggable='false' />
      </div>
    </div>,
  ];

  const infoSlides: React.ReactElement[] = [
    <div className='card-wrapper'>
      <div className='card-content'>
        <p>Вклады Лига Банка – это выгодная инвестиция в свое будущее</p>
        <ul>
          <li>Проценты по вкладам до 7%</li>
          <li>Разнообразные условия</li>
          <li>Возможность ежемесячной капитализации или вывод процентов на банковскую карту</li>
        </ul>
        <button className='button button-primary' onClick={() => navigateTo("calculate")}>
          Узнать подробнее
        </button>
      </div>
      <img src={PiggyBank} draggable='false' />
    </div>,
    <div className='card-wrapper'>
      <div className='card-content' style={{ width: "35%" }}>
        <p>Лига Банк выдает кредиты под любые цели</p>
        <ul>
          <li>Ипотечный кредит</li>
          <li>Автокредит</li>
          <li>Потребительский кредит</li>
        </ul>
        <div>
          <p>
            Рассчитайте ежемесячный платеж и ставку по кредиту воспользовавшись нашим{" "}
            <a className='link underline' onClick={() => navigateTo("calculate")}>
              кредитным калькулятором
            </a>
          </p>
        </div>
      </div>
      <img src={Car} draggable='false' />
    </div>,
    <div className='card-wrapper'>
      <div className='card-content'>
        <p>Лига Страхование — застрахуем все что захотите</p>
        <ul>
          <li>Автомобильное страхование</li>
          <li>Страхование жизни и здоровья</li>
          <li>Страхование недвижимости</li>
        </ul>
        <div>
          <button className='button button-primary' onClick={() => navigateTo("calculate")}>
            Узнать подробнее
          </button>
        </div>
      </div>
      <img src={Security} draggable='false' />
    </div>,
    <div className='card-wrapper'>
      <div className='card-content'>
        <p>Лига Банк — это огромное количество онлайн-сервисов для вашего удобства</p>
        <ul>
          <li>Мобильный банк, который всегда под рукой</li>
          <li>Приложение Лига-проездной позволит вам оплачивать билеты по всему миру</li>
        </ul>
        <div>
          <button className='button button-primary' onClick={() => navigateTo("calculate")}>
            Узнать подробнее
          </button>
        </div>
      </div>
      <img src={MobileApp} draggable='false' />
    </div>,
  ];

  const buttonSlides: React.ReactElement[] = [
    <>
      <VaultIcon />
      <p>Вклады</p>
    </>,
    <>
      <DebtsIcon />
      <p>Кредиты</p>
    </>,
    <>
      <InsuranceIcon />
      <p>Страхование</p>
    </>,
    <>
      <PhoneIcon />
      <p>Онлайн-сервисы</p>
    </>,
  ];

  return (
    <>
      <div className='slider'>
        <SwiperComponent slides={heroSlides} />
      </div>
      <div className='main-content background-limit'>
        <Services slides={infoSlides} buttonSlides={buttonSlides} id='services' />
        <Calculator id='calculate' />
        <Map id='map' />
      </div>
    </>
  );
};
