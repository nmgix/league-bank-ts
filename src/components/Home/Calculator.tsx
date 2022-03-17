import React, { useState } from "react";
import { ICalculator } from "../../interfaces/ICalculator";
import { FirstStep } from "../../redux/types/calcluatorType";
import { ContextWraper } from "../essentials/ContextWraper";
import { InputConsumer } from "../essentials/InputConsumer";
import { Dropdown } from "./Calculator/Dropdown";
import { Offer } from "./Calculator/Offer";

export const Calculator: React.FC<{ id: string }> = ({ id }) => {
  const [firstStep, SetFirstStep] = useState<keyof typeof FirstStep | null>(null);

  const ChangeFirstStep = (step: keyof typeof FirstStep, cb?: () => void) => {
    SetFirstStep(step);
    cb!();
  };

  const RenderCalculator: React.FC<{ state: ICalculator }> = ({ state }) => {
    const FrameComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      return (
        <div className='second-step'>
          <h4>Шаг 2. Введите параметры кредита</h4>
          {children}
        </div>
      );
    };

    switch (state.firstStep) {
      case "mortgageLending": {
        return (
          <FrameComponent>
            <div className='field'>
              <span className='field-title'>Стоимость недвижимости</span>
              <InputConsumer
                className='field-buttons'
                inputName='estate_cost'
                initialValue={1200000}
                type={"number"}
                step={10000}
                min={1200000}
                max={25000000}
                minBoundError={<span className='field-error'>Взнос должен быть больше 1 200 000 рублей</span>}
                maxBoundError={<span className='field-error'>Взнос должен быть меньше стоимости</span>}
              />

              <span className='help-text'>От 1 200 000 до 25 000 000 рублей</span>
            </div>
            <div className='field'>
              <span className='field-title'>Первоначальный взнос</span>
              <InputConsumer
                className='field-slider'
                inputName='initial_payment'
                initialValue={200000}
                type={"range"}
                step={10000}
                min={200000}
                max={2000000}
                prefix='%'
                showStep={true}
                dependencyMax={"estate_cost"}
                minBoundError={<span className='field-error'>Взнос должен быть больше 200 000 рублей</span>}
                maxBoundError={<span className='field-error'>Взнос должен быть меньше стоимости</span>}
              />
            </div>
            <div className='field'>
              <span className='field-title'>Срок кредитования</span>
              <InputConsumer
                className='field-slider'
                inputName='loan_term'
                initialValue={5}
                type={"range"}
                step={1}
                min={5}
                max={30}
                prefix='лет'
              />
            </div>
            <div className='field'>
              <InputConsumer
                className='field-checkbox'
                inputName='parent_capital'
                initialValue={false}
                type={"checkbox"}
                label='Использовать материнский капитал'
              />
            </div>
          </FrameComponent>
        );
      }
      case "carLending": {
        return (
          <FrameComponent>
            <div className='field'>
              <span className='field-title'>Стоимость автомобиля</span>
              <InputConsumer
                className='field-buttons'
                inputName='car_cost'
                initialValue={2000000}
                type={"number"}
                step={50000}
                min={500000}
                max={5000000}
                minBoundError={<span className='field-error'>Взнос должен быть больше 500 000 рублей</span>}
                maxBoundError={<span className='field-error'>Взнос должен быть меньше стоимости</span>}
              />
              <span className='help-text'>От 500 000 до 5 000 000 рублей</span>
            </div>
            <div className='field'>
              <span className='field-title'>Первоначальный взнос</span>
              <InputConsumer
                className='field-slider'
                inputName='initial_payment'
                initialValue={400000}
                type={"range"}
                step={5}
                min={400000}
                max={2000000}
                prefix='%'
                showStep={true}
                dependencyMax={"car_cost"}
                minBoundError={<span className='field-error'>Взнос должен быть больше 400 000 рублей</span>}
                maxBoundError={<span className='field-error'>Взнос должен быть меньше стоимости</span>}
              />
            </div>
            <div className='field'>
              <span className='field-title'>Срок кредитования</span>
              <InputConsumer
                className='field-slider'
                inputName='loan_term'
                initialValue={1}
                type={"range"}
                step={1}
                min={1}
                max={5}
                prefix='лет'
              />
            </div>
            <div className='field'>
              <InputConsumer
                className='field-checkbox'
                inputName='casko'
                initialValue={false}
                type={"checkbox"}
                label='Оформить КАСКО в нашем банке'
              />
            </div>
            <div className='field'>
              <InputConsumer
                className='field-checkbox'
                inputName='insurance'
                initialValue={false}
                type={"checkbox"}
                label='Оформить Страхование жизни в нашем банке'
              />
            </div>
          </FrameComponent>
        );
      }
      case "consumerLending": {
        return (
          <FrameComponent>
            <div className='field'>
              <span className='field-title'>Сумма потребительского кредита</span>
              <InputConsumer
                className='field-buttons'
                inputName='consumer_loan_cost'
                initialValue={50000}
                type={"number"}
                step={50000}
                min={50000}
                max={3000000}
                minBoundError={<span className='field-error'>Взнос должен быть больше 50 000 рублей</span>}
                maxBoundError={<span className='field-error'>Взнос должен быть меньше стоимости</span>}
              />
              <span className='help-text'>От 50 000 до 3 000 000 рублей</span>
            </div>
            <div className='field'>
              <span className='field-title'>Срок кредитования</span>
              <InputConsumer
                className='field-slider'
                inputName='loan_term'
                initialValue={1}
                type={"range"}
                step={1}
                min={1}
                max={7}
                prefix='лет'
              />
            </div>
            <div className='field'>
              <InputConsumer
                className='field-checkbox'
                inputName='member'
                initialValue={false}
                type={"checkbox"}
                label='Участник зарплатного проекта нашего банка'
              />
            </div>
          </FrameComponent>
          /* </Context.Provider> */
        );
      }
      default: {
        return <></>;
      }
    }
  };

  return (
    <div id={id}>
      <h1>Кредитный калькулятор</h1>
      <div className='calculator-wrapper'>
        <ContextWraper>
          <div className='steps'>
            <div className='first-step'>
              <h4>Шаг 1. Цель кредита</h4>
              <Dropdown ChangeFirstStep={ChangeFirstStep} />
            </div>
            <RenderCalculator state={{ firstStep }} />
          </div>
          {firstStep !== null ? <Offer step={firstStep} /> : <></>}
        </ContextWraper>
      </div>
    </div>
  );
};
