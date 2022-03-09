import React, { createRef, useState, useContext, useEffect } from "react";
// import { Context } from "../Calculator";
import { changeStateFunc, AvailableKeys } from "../../../interfaces/ICalculator";
import { useAction } from "../../../redux/hooks/useAction";
import { useTypedSelector } from "../../../redux/hooks/useTypedSelector";
import { FirstStep } from "../../../redux/types/calcluatorType";

export const CheckNumber = (min: number, max: number, value: number, callback: (value: number) => void) => {
  if (value < min) {
    return callback(min);
  }
  if (value > max) {
    return callback(max);
  }
  if (!isNaN(value)) {
    return callback(value);
  } else {
    var middle = (min + max) / 2;
    if (value > middle) {
      return callback(max);
    } else {
      return callback(min);
    }
  }
};

const FieldWithButtons: React.FC<{
  field: AvailableKeys;
  step: number;
  defaultValue: number;
  min: number;
  max: number;
  minBoundError: React.ReactNode;
  maxBoundError: React.ReactNode;
  dependencyMin?: AvailableKeys;
  dependencyMax?: AvailableKeys;
  children?: React.ReactNode;
}> = ({
  children,
  field,
  step,
  defaultValue,
  min,
  max,
  minBoundError,
  maxBoundError,
  dependencyMin,
  dependencyMax,
}) => {
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

  useEffect(() => {
    if (dependencyMin) {
      min = state[dependencyMin];
    }
    if (dependencyMax) {
      max = state[dependencyMax];
    }
  }, [state]);

  return (
    <div className='field-buttons' key={field}>
      <div className='main-input'>
        <button
          onClick={() => {
            if (fieldState <= min) {
              return;
            }
            CheckNumber(min, max, fieldState, (value): void => {
              SetState(field, value - step);
              setFieldState(value - step);
            });
          }}>
          −
        </button>
        <input
          min={min}
          max={max}
          type={"number"}
          value={fieldState}
          className={`field-input ${fieldState < min ? "error" : fieldState > max ? "error" : ""}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            CheckNumber(min, max, e.target.valueAsNumber, (value): void => {
              SetState(field, value);
              setFieldState(value);
            });
          }}
        />
        <button
          onClick={() => {
            if (fieldState >= max) {
              return;
            }
            CheckNumber(min, max, fieldState, (value): void => {
              SetState(field, value + step);
              setFieldState(value + step);
            });
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
