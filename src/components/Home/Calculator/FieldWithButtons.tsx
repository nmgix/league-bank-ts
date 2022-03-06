import React, { createRef, useState, useContext, useEffect } from "react";
// import { Context } from "../Calculator";
import { changeStateFunc, AvailableKeys } from "../../../interfaces/ICalculator";
import { useGlobalContext } from "../Calculator";

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

  const { state, setState } = useGlobalContext();

  return (
    <div className='field-buttons' key={field}>
      <div className='main-input'>
        <button
          onClick={() => {
            setState({ ...state, [field]: inputRef.current!.valueAsNumber - step });
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
            setState({ ...state, [field]: !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : min });
            setFieldState(!isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : min);
          }}
        />
        <button
          onClick={() => {
            setState({ ...state, [field]: inputRef.current!.valueAsNumber + step });
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
