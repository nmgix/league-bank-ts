import React from "react";
import { useGlobalContext } from "../Calculator";

export const Offer: React.FC = () => {
  const { state, setState } = useGlobalContext();

  return (
    <div className='offer'>
      <h3>Наше предложение</h3>
      <div>
        <p></p>
        <span>Сумма ипотеки</span>
      </div>
      <div>
        <p></p>
        <span>Процентная ставка</span>
      </div>
      <div>
        <p></p>
        <span>Ежемесячный платеж</span>
      </div>
      <div>
        <p></p>
        <span>Необходимый доход</span>
      </div>
      <button className='button button-primary'>Оформить заявку</button>
    </div>
  );
};
