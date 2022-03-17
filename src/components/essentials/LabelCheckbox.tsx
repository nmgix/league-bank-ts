import React from "react";
import Checkmark from "../../images/checkmark.svg";
import { ICheckbox } from "../../interfaces/ICheckbox";

export const LabelCheckbox: React.FC<ICheckbox> = ({ field, state, defaultValue, label, setState }) => {
  return (
    <div className='field-checkbox' key={field}>
      <label>
        <input
          style={{ content: state[field] === true ? `url(${Checkmark})` : " " }}
          type={"checkbox"}
          checked={state ? state[field] : defaultValue}
          onChange={() => {
            setState({ ...state, [field]: !state[field] });
          }}
        />
        {label}
      </label>
    </div>
  );
};
