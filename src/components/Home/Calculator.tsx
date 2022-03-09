import React, { useEffect, useState } from "react";
import dropdownChevron from "../../images/selection-arrow.svg";
import { ICalculator } from "../../interfaces/ICalculator";
import { useAction } from "../../redux/hooks/useAction";
// import { useAction } from "../../redux/hooks/useAction";
// import { useTypedSelector } from "../../redux/hooks/useTypedSelector";
import { FirstStep, translateText } from "../../redux/types/calcluatorType";
import { FieldWithButtons } from "./Calculator/FieldWithButtons";
import { FieldWithCheckbox } from "./Calculator/FieldWithCheckbox";
import { FieldWithSlider } from "./Calculator/FieldWithSlider";
import { Offer } from "./Calculator/Offer";

export const Calculator: React.FC = () => {
  // const { activeDropdown, firstStep } = useTypedSelector((state) => state.calculator);
  const { SetState } = useAction();
  const [activeDropdown, SetDropdown] = useState<boolean>(false);
  const [firstStep, SetFirstStep] = useState<keyof typeof FirstStep | null>(null);

  const ChangeFirstStep = (step: keyof typeof FirstStep) => {
    SetFirstStep(step);
    SetState("initial_payment", null);
  };

  const RenderCalculator: React.FC<{ state: ICalculator }> = ({ state }) => {
    const FrameComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      //будем тут пробовать type inferrance, чтобы при каждом отдельном case (свича) использовалось отдельный тип CalculatorsLending
      //и ещё будет этот компонент юзать useContext чтобы иметь общий контекст тут и все поля добавлять
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
              <FieldWithButtons
                field='estate_cost'
                step={10000}
                defaultValue={1200000}
                min={1200000}
                max={25000000}
                minBoundError={<span className='field-error'>Взнос должен быть больше 1 200 000 рублей</span>}
                maxBoundError={<span className='field-error'>Взнос должен быть меньше стоимости</span>}
              />
              <span className='help-text'>От 1 200 000 до 25 000 000 рублей</span>
            </div>
            <div className='field'>
              <span className='field-title'>Первоначальный взнос</span>
              <FieldWithSlider
                field='initial_payment'
                step={10}
                min={200000}
                max={2000000}
                defaultValue={200000}
                prefix='%'
                showStep={true}
                dependencyMax={"estate_cost"}
                minBoundError={<span className='field-error'>Взнос должен быть больше 200 000 рублей</span>}
                maxBoundError={<span className='field-error'>Взнос должен быть меньше стоимости</span>}
              />
            </div>
            <div className='field'>
              <span className='field-title'>Срок кредитования</span>
              <FieldWithSlider field='loan_term' step={1} min={5} max={30} defaultValue={5} prefix='лет' />
            </div>
            <div className='field'>
              <FieldWithCheckbox field='parent_capital' defaultValue={false} label='Использовать материнский капитал' />
            </div>
          </FrameComponent>
        );
      }
      case "carLending": {
        return (
          // <Context.Provider value={{ state: ledningState, setState: setLendingState }}>
          <FrameComponent>
            <div className='field'>
              <span className='field-title'>Стоимость автомобиля</span>
              <FieldWithButtons
                field='car_cost'
                step={50000}
                defaultValue={2000000}
                min={500000}
                max={5000000}
                minBoundError={<span className='field-error'>Взнос должен быть больше 500 000 рублей</span>}
                maxBoundError={<span className='field-error'>Взнос должен быть меньше стоимости</span>}
              />
              <span className='help-text'>От 500 000 до 5 000 000 рублей</span>
            </div>
            <div className='field'>
              <span className='field-title'>Первоначальный взнос</span>
              <FieldWithSlider
                field='initial_payment'
                step={5}
                min={400000}
                max={2000000}
                defaultValue={400000}
                prefix='%'
                showStep={true}
                dependencyMax={"car_cost"}
                minBoundError={<span className='field-error'>Взнос должен быть больше 400 000 рублей</span>}
                maxBoundError={<span className='field-error'>Взнос должен быть меньше стоимости</span>}
              />
            </div>
            <div className='field'>
              <span className='field-title'>Срок кредитования</span>
              <FieldWithSlider field='loan_term' step={1} min={1} max={5} defaultValue={1} prefix='лет' />
            </div>
            <div className='field'>
              <FieldWithCheckbox field='casko' defaultValue={false} label='Оформить КАСКО в нашем банке' />
            </div>
            <div className='field'>
              <FieldWithCheckbox
                field='insurance'
                defaultValue={false}
                label='Оформить Страхование жизни в нашем банке'
              />
            </div>
          </FrameComponent>
          // </Context.Provider>
        );
      }
      case "consumerLending": {
        return (
          // <Context.Provider value={{ state: ledningState, setState: setLendingState }}>
          <FrameComponent>
            <div className='field'>
              <span className='field-title'>Сумма потребительского кредита</span>
              <FieldWithButtons
                field='consumer_loan_cost'
                step={50000}
                defaultValue={50000}
                min={50000}
                max={3000000}
                minBoundError={<span className='field-error'>Взнос должен быть больше 50 000 рублей</span>}
                maxBoundError={<span className='field-error'>Взнос должен быть меньше стоимости</span>}
              />
              <span className='help-text'>От 50 000 до 3 000 000 рублей</span>
            </div>
            <div className='field'>
              <span className='field-title'>Срок кредитования</span>
              <FieldWithSlider field='loan_term' step={1} min={1} max={7} defaultValue={1} prefix='лет' />
            </div>
            <div className='field'>
              <FieldWithCheckbox
                field='member'
                defaultValue={false}
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
    // <CalculatorContext.Provider value={{ state: ledningState, setState: lendingStateChanger }}>
    <div id='calculate'>
      <h1>Кредитный калькулятор</h1>
      <div className='calculator-wrapper'>
        <div className='steps'>
          <div className='first-step'>
            <h4>Шаг 1. Цель кредита</h4>
            <div className='dropdown-wrapper'>
              <button
                className='button dropdown'
                style={{ borderRadius: `4px 4px ${activeDropdown ? "0px 0px" : "4px 4px"}` }}
                onClick={() => SetDropdown(!activeDropdown)}>
                {firstStep !== null ? translateText[firstStep] : "Выберите цель кредита"}{" "}
                {activeDropdown ? (
                  <img src={dropdownChevron} style={{ transform: "scale(-1, -1)" }} alt='dropdown chevron' />
                ) : (
                  <img src={dropdownChevron} alt='dropdown chevron' />
                )}
              </button>
              <ul style={{ height: "auto", display: activeDropdown ? "block" : "none" }}>
                <li
                  onClick={() => {
                    SetDropdown(false);
                    ChangeFirstStep("mortgageLending");
                  }}>
                  Ипотечное кредитование
                </li>
                <li
                  onClick={() => {
                    SetDropdown(false);
                    ChangeFirstStep("carLending");
                  }}>
                  Автомобильное кредитование
                </li>
                <li
                  onClick={() => {
                    SetDropdown(false);
                    ChangeFirstStep("consumerLending");
                  }}>
                  Потребительский кредит
                </li>
              </ul>
              {/* ) : (
                <></>
              )} */}
            </div>
          </div>
          <RenderCalculator state={{ activeDropdown, firstStep }} />
        </div>
        {firstStep !== null ? <Offer step={firstStep} /> : <></>}
      </div>
    </div>
  );
};
