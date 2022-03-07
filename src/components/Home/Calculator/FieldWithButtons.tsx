import React, { createRef, useState, useContext, useEffect } from "react";
// import { Context } from "../Calculator";
import { changeStateFunc, AvailableKeys } from "../../../interfaces/ICalculator";
import { useAction } from "../../../redux/hooks/useAction";
import { useTypedSelector } from "../../../redux/hooks/useTypedSelector";

const FieldWithButtons: React.FC<{
  field: AvailableKeys;
  step: number;
  defaultValue: number;
  min: number;
  max: number;
  minBoundError: React.ReactNode;
  maxBoundError: React.ReactNode;
  children?: React.ReactNode;
}> = ({ children, field, step, defaultValue, min, max, minBoundError, maxBoundError }) => {
  const inputRef = createRef<HTMLInputElement>();

  const [fieldState, setFieldState] = useState<number>(defaultValue);

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
    <div className='field-buttons' key={field}>
      <div className='main-input'>
        <button
          onClick={() => {
            SetState(field, inputRef.current!.valueAsNumber - step);
            setFieldState(inputRef.current!.valueAsNumber - step);
          }}>
          −
        </button>
        <input
          min={min}
          max={max}
          type={"number"}
          value={fieldState}
          ref={inputRef}
          className={`field-input ${fieldState < min ? "error" : fieldState > max ? "error" : ""}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            SetState(field, !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : min);
            setFieldState(!isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : min);
          }}
        />
        <button
          onClick={() => {
            SetState(field, inputRef.current!.valueAsNumber + step);
            setFieldState(inputRef.current!.valueAsNumber + step);
          }}>
          +
        </button>
      </div>
      {fieldState < min ? minBoundError : <></>}
      {fieldState > max ? maxBoundError : <></>}
      {children ? children : <></>}
    </div>
  );
};

export { FieldWithButtons };
