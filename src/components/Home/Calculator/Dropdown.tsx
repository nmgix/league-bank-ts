import React, { useContext } from "react";
import { FirstStep, translateText } from "../../../redux/types/calcluatorType";

import dropdownChevron from "../../../images/selection-arrow.svg";
import { Context } from "../../ContextWraper";

export const Dropdown: React.FC<{
  activeDropdown: boolean;
  SetDropdown: (value: React.SetStateAction<boolean>) => void;
  ChangeFirstStep: (step: keyof typeof FirstStep, cb: () => void) => void;
  firstStep: keyof typeof FirstStep;
}> = ({ activeDropdown, SetDropdown, ChangeFirstStep, firstStep }) => {
  const context = useContext(Context);
  //   context.resetState!();

  return (
    <div className='dropdown-wrapper'>
      <button
        className='button dropdown'
        style={{ borderRadius: `4px 4px ${activeDropdown ? "0px 0px" : "4px 4px"}` }}
        onClick={() => SetDropdown(!activeDropdown)}>
        {firstStep !== null ? translateText[firstStep] : "Выберите цель кредита"}{" "}
        {activeDropdown ? (
          <img src={dropdownChevron} style={{ transform: "scale(-1, -1)" }} alt='dropdown chevron' draggable='false' />
        ) : (
          <img src={dropdownChevron} alt='dropdown chevron' draggable='false' />
        )}
      </button>
      <ul style={{ height: "auto", display: activeDropdown ? "block" : "none" }}>
        <li
          onClick={() => {
            SetDropdown(false);
            ChangeFirstStep("mortgageLending", () => context.resetState!());
          }}>
          Ипотечное кредитование
        </li>
        <li
          onClick={() => {
            SetDropdown(false);
            ChangeFirstStep("carLending", () => context.resetState!());
          }}>
          Автомобильное кредитование
        </li>
        <li
          onClick={() => {
            SetDropdown(false);
            ChangeFirstStep("consumerLending", () => context.resetState!());
          }}>
          Потребительский кредит
        </li>
      </ul>
      {/* ) : (
                <></>
              )} */}
    </div>
  );
};
