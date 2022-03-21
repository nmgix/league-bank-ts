import React, { useContext, useState } from "react";

import dropdownChevron from "../../../images/selection-arrow.svg";
import { Context } from "../../essentials/ContextWraper";
import { Modal } from "../../essentials/Modal";

export const Dropdown: React.FC<{
  defaultValue: string;
  cases: {
    [x: string]: string | any;
  };
  ChangeChoice: (choice: string | any, cb?: () => void) => void;
}> = ({ ChangeChoice, cases, defaultValue }) => {
  const context = useContext(Context);

  const [currentCase, setCurrentCase] = useState<string | null>(null);
  const [activeDropdown, SetDropdown] = useState<boolean>(false);

  return (
    <div className='dropdown-wrapper'>
      <button
        className='button dropdown'
        style={{ borderRadius: `4px 4px ${activeDropdown ? "0px 0px" : "4px 4px"}` }}
        onClick={() => {
          SetDropdown(!activeDropdown);
        }}>
        {currentCase !== null ? cases[currentCase] : defaultValue}

        {activeDropdown ? (
          <img src={dropdownChevron} style={{ transform: "scale(-1, -1)" }} alt='dropdown chevron' draggable='false' />
        ) : (
          <img src={dropdownChevron} alt='dropdown chevron' draggable='false' />
        )}
      </button>

      <Modal
        style={{ height: "auto", display: activeDropdown ? "block" : "none", width: "100%" }}
        active={activeDropdown}
        setActive={SetDropdown}
        dependencyValues={SetDropdown}>
        <ul style={{ height: "auto", width: "100%", boxSizing: "border-box" }}>
          {Object.keys(cases).map((key) => (
            <li
              key={key}
              onClick={() => {
                SetDropdown(false);
                setCurrentCase(key);
                ChangeChoice(key, () => context.resetState!());
              }}>
              {cases[key]}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};
