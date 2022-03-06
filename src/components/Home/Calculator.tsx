import React, { useCallback, useContext, useEffect, useState } from "react";
import dropdownChevron from "../../images/selection-arrow.svg";
import {
  ICalculator,
  IFields,
  IFieldsArray,
  CalculatorsLending,
  MortgageLending,
  CarLending,
  ConsumerLending,
  ContextState,
  AvailableKeys,
  changeStateFunc,
} from "../../interfaces/ICalculator";
import { FieldWithButtons } from "./Calculator/FieldWithButtons";
import { FieldWithCheckbox } from "./Calculator/FieldWithCheckbox";
import { FieldWithSlider } from "./Calculator/FieldWithSlider";
import { Offer } from "./Calculator/Offer";

enum idFromText {
  "Ипотечное кредитование",
  "Автомобильное кредитование",
  "Потребительский кредит",
}

const CalculatorContext = React.createContext<ContextState>({
  state: null,
  setState: () => {},
});
export const useGlobalContext = () => useContext(CalculatorContext);

//
//
//

export const Calculator: React.FC = () => {
  const [calculatorState, setCalculatorState] = useState<ICalculator>({
    activeDropdown: false,
    firstStep: null,
  });

  const [ledningState, setLendingState] = useState<any>(null);

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
      case 0: {
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
                maxBoundError={<span className='field-error'>Взнос должен быть меньше 25 000 000 рублей</span>}
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
                minBoundError={<span className='field-error'>Взнос должен быть больше 200 000 рублей</span>}
                maxBoundError={<span className='field-error'>Взнос должен быть меньше 2 000 000 рублей</span>}
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
      case 1: {
        return (
          // <Context.Provider value={{ state: ledningState, setState: setLendingState }}>
          <FrameComponent>
            <></>
          </FrameComponent>
          // </Context.Provider>
        );
      }
      case 2: {
        return (
          // <Context.Provider value={{ state: ledningState, setState: setLendingState }}>
          <FrameComponent>
            <></>
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
      <CalculatorContext.Provider value={{ state: ledningState, setState: setLendingState }}>
        <h1>Кредитный калькулятор</h1>
        <div className='calculator-wrapper'>
          <div className='steps'>
            <div className='first-step'>
              <h4>Шаг 1. Цель кредита</h4>
              <div className='dropdown-wrapper'>
                <button
                  className='button dropdown'
                  style={{ borderRadius: `4px 4px ${calculatorState.activeDropdown ? "0px 0px" : "4px 4px"}` }}
                  onClick={() =>
                    setCalculatorState({ ...calculatorState, activeDropdown: !calculatorState.activeDropdown })
                  }>
                  {calculatorState.firstStep !== null ? idFromText[calculatorState.firstStep] : "Выберите цель кредита"}{" "}
                  {calculatorState.activeDropdown ? (
                    <img src={dropdownChevron} style={{ transform: "scale(-1, -1)" }} alt='dropdown chevron' />
                  ) : (
                    <img src={dropdownChevron} alt='dropdown chevron' />
                  )}
                </button>
                {/* {calculatorState.activeDropdown ? ( */}
                <ul style={{ height: "auto", display: calculatorState.activeDropdown ? "block" : "none" }}>
                  <li onClick={() => setCalculatorState({ activeDropdown: false, firstStep: 0 })}>
                    Ипотечное кредитование
                  </li>
                  <li onClick={() => setCalculatorState({ activeDropdown: false, firstStep: 1 })}>
                    Автомобильное кредитование
                  </li>
                  <li onClick={() => setCalculatorState({ activeDropdown: false, firstStep: 2 })}>
                    Потребительский кредит
                  </li>
                </ul>
                {/* ) : (
                <></>
              )} */}
              </div>
            </div>
            <RenderCalculator state={calculatorState} />
          </div>
          {calculatorState.firstStep !== null ? <Offer /> : <></>}
        </div>
      </CalculatorContext.Provider>
    </div>
  );
};
