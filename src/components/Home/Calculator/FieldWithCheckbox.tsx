import { useEffect, useState } from "react";
import Checkmark from "../../../images/checkmark.svg";
import { changeStateFunc, AvailableKeys } from "../../../interfaces/ICalculator";
import { useGlobalContext } from "../Calculator";
// import { useGlobalContext } from "../Calculator";

const FieldWithCheckbox: React.FC<{
  field: AvailableKeys;
  defaultValue: boolean;
  label: string;
}> = ({ field, defaultValue, label }) => {
  const [fieldState, setFieldState] = useState<boolean>(defaultValue);

  const { state, setState } = useGlobalContext();

  return (
    <div className='field-checkbox' key={field}>
      <label>
        <input
          style={{ content: fieldState === true ? `url(${Checkmark})` : " " }}
          type={"checkbox"}
          checked={fieldState ? fieldState : defaultValue}
          onChange={() => {
            // setState({ ...state, [field]: !fieldState });
            setState({ ...state, [field]: !fieldState });
            setFieldState(!fieldState);
          }}
        />
        {label}
        {/* <img src={Checkmark} alt='checkmark' /> */}
      </label>
    </div>
  );
};

export { FieldWithCheckbox };
