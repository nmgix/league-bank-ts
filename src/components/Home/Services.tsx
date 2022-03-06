import React from "react";
import { useState } from "react";
import { ReactComponent as VaultIcon } from "../../images/vault.svg";
import { ReactComponent as DebtsIcon } from "../../images/cards.svg";
import { ReactComponent as InsuranceIcon } from "../../images/security.svg";
import { ReactComponent as PhoneIcon } from "../../images/phone.svg";

import PiggyBank from "../../images/piggybank.webp";
import Car from "../../images/car.webp";
import Security from "../../images/lock.webp";
import MobileApp from "../../images/mobile.webp";

export const Services: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const CardHolder: React.FC<{ currentPage: number }> = ({ currentPage }) => {
    var component = <></>;

    switch (currentPage) {
      case 1:
        return (component = (
          <>
            <div className='card-content'>
              <p>Вклады Лига Банка – это выгодная инвестиция в свое будущее</p>
              <ul>
                <li>Проценты по вкладам до 7%</li>
                <li>Разнообразные условия</li>
                <li>Возможность ежемесячной капитализации или вывод процентов на банковскую карту</li>
              </ul>
              <button className='button button-primary'>Узнать подробнее</button>
            </div>
            <img src={PiggyBank} />
          </>
        ));
      case 2:
        return (component = (
          <>
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
                  <a href='#calculator' className='link underline'>
                    кредитным калькулятором
                  </a>
                </p>
              </div>
            </div>
            <img src={Car} />
          </>
        ));
      case 3:
        return (component = (
          <>
            <div className='card-content'>
              <p>Лига Страхование — застрахуем все что захотите</p>
              <ul>
                <li>Автомобильное страхование</li>
                <li>Страхование жизни и здоровья</li>
                <li>Страхование недвижимости</li>
              </ul>
              <div>
                <button className='button button-primary'>Узнать подробнее</button>
              </div>
            </div>
            <img src={Security} />
          </>
        ));
      case 4:
        return (component = (
          <>
            <div className='card-content'>
              <p>Лига Банк — это огромное количество онлайн-сервисов для вашего удобства</p>
              <ul>
                <li>Мобильный банк, который всегда под рукой</li>
                <li>Приложение Лига-проездной позволит вам оплачивать билеты по всему миру</li>
              </ul>
              <div>
                <button className='button button-primary'>Узнать подробнее</button>
              </div>
            </div>
            <img src={MobileApp} />
          </>
        ));
    }

    return component;
  };

  return (
    <div id='services'>
      <ul>
        <li onClick={() => setCurrentPage(1)}>
          <VaultIcon />
          <p>Вклады</p>
        </li>
        <li onClick={() => setCurrentPage(2)}>
          <DebtsIcon />
          <p>Кредиты</p>
        </li>
        <li onClick={() => setCurrentPage(3)}>
          <InsuranceIcon />
          <p>Страхование</p>
        </li>
        <li onClick={() => setCurrentPage(4)}>
          <PhoneIcon />
          <p>Онлайн-сервисы</p>
        </li>
      </ul>
      <div className='card-holder'>
        <CardHolder currentPage={currentPage} />
      </div>
    </div>
  );
};
