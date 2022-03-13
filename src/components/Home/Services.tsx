import React, { useEffect } from "react";
import { useState } from "react";
import { ReactComponent as VaultIcon } from "../../images/vault.svg";
import { ReactComponent as DebtsIcon } from "../../images/cards.svg";
import { ReactComponent as InsuranceIcon } from "../../images/security.svg";
import { ReactComponent as PhoneIcon } from "../../images/phone.svg";

import { SwiperComponent } from "../SwiperComponent";

export const Services: React.FC<{ slides: React.ReactElement[]; widthThreshold: number; id: string }> = ({
  slides,
  widthThreshold,
  id,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const CardHolder: React.FC<{ currentPage: number }> = ({ currentPage }) => {
    return slides[currentPage - 1];
  };

  return (
    <div id={id}>
      <SwiperComponent slides={slides} />

      <div className='card-switch'>
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
    </div>
  );
};
