import { useEffect, useState } from "react";
import Checkmark from "../../../images/checkmark.svg";
import { changeStateFunc, AvailableKeys } from "../../../interfaces/ICalculator";
import { useAction } from "../../../redux/hooks/useAction";
import { useTypedSelector } from "../../../redux/hooks/useTypedSelector";

const FieldWithCheckbox: React.FC<{
  field: AvailableKeys;
  defaultValue: boolean;
  label: string;
}> = ({ field, defaultValue, label }) => {
  const [fieldState, setFieldState] = useState<boolean>(defaultValue);

  const { state } = useTypedSelector((state) => state.calculator);
  const { SetState } = useAction();

  useEffect(() => {
    if (!state || state[field] == null) {
      SetState(field, defaultValue);
    } else {
      setFieldState(state[field]);
    }
  }, [state]);

  return (
    <div className='field-checkbox' key={field}>
      <label>
        <input
          style={{ content: fieldState === true ? `url(${Checkmark})` : " " }}
          type={"checkbox"}
          checked={fieldState ? fieldState : defaultValue}
          onChange={() => {
            SetState(field, !fieldState);
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
