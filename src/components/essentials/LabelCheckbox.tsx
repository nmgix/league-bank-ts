import React from "react";
import Checkmark from "../../images/checkmark.svg";
import { ICheckbox } from "../../interfaces/ICheckbox";

export const LabelCheckbox: React.FC<ICheckbox> = ({ field, state, label, setState }) => {
  return (
    <div className='field-checkbox' key={field}>
      <label>
        <input
          style={{ content: state === true ? `url(${Checkmark})` : " " }}
          type={"checkbox"}
          checked={state}
          onChange={() => {
            setState(field, !state);
          }}
        />
        {label}
      </label>
    </div>
  );
};
