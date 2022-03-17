import React, { useContext, useState } from "react";
import { FirstStep } from "../../../redux/types/calcluatorType";

import dropdownChevron from "../../../images/selection-arrow.svg";
import { Context } from "../../essentials/ContextWraper";

export const Dropdown: React.FC<{
  ChangeFirstStep: (step: keyof typeof FirstStep, cb: () => void) => void;
}> = ({ ChangeFirstStep }) => {
  const context = useContext(Context);

  const [currentCase, setCurrentCase] = useState<keyof typeof FirstStep | null>(null);
  const [activeDropdown, SetDropdown] = useState<boolean>(false);

  return (
    <div className='dropdown-wrapper'>
      <button
        className='button dropdown'
        style={{ borderRadius: `4px 4px ${activeDropdown ? "0px 0px" : "4px 4px"}` }}
        onClick={() => SetDropdown(!activeDropdown)}>
        {currentCase !== null ? FirstStep[currentCase] : "Выберите цель кредита"}

        {activeDropdown ? (
          <img src={dropdownChevron} style={{ transform: "scale(-1, -1)" }} alt='dropdown chevron' draggable='false' />
        ) : (
          <img src={dropdownChevron} alt='dropdown chevron' draggable='false' />
        )}
      </button>

      <ul style={{ height: "auto", display: activeDropdown ? "block" : "none", width: "100%" }}>
        {Object.keys(FirstStep).map((key) => (
          <li
            key={key}
            onClick={() => {
              SetDropdown(false);
              setCurrentCase(key as keyof typeof FirstStep);
              ChangeFirstStep(key as keyof typeof FirstStep, () => context.resetState!());
            }}>
            {FirstStep[key as keyof typeof FirstStep]}
          </li>
        ))}
      </ul>
    </div>
  );
};
