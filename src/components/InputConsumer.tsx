import React, { useContext, useEffect } from "react";
import { TextInputBaseInterface } from "../interfaces/ICalculator";
import { Context } from "./ContextWraper";

import Checkmark from "../images/checkmark.svg";

export const CheckNumber = (min: number, max: number, value: number, callback: (value: number) => any) => {
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

// @ https://stackoverflow.com/questions/55757761/handle-an-input-with-react-hooks

export const InputConsumer: React.FC<TextInputBaseInterface> = ({
  inputName,
  type,
  initialValue,
  className,
  min,
  max,
  required,
  label,
  step,
  prefix,
  showStep,
  dependencyMin,
  dependencyMax,
  minBoundError,
  maxBoundError,
}) => {
  const context = useContext(Context);
  const state = context.state;

  useEffect(() => {
    if (context.setInputInitialState !== null) {
      context.setInputInitialState({
        value: initialValue,
        inputName,
        type,
        initialValue,
        className,
        min,
        max,
        required,
        label,
        step,
        prefix,
        showStep,
        dependencyMin,
        dependencyMax,
        minBoundError,
        maxBoundError,
      });
    }
  }, []);

  switch (type) {
    case "text": {
      return <div className={className}></div>;
    }
    case "number": {
      const fieldState = state[inputName] ? state[inputName].value : initialValue;

      return (
        <div className={className}>
          <div className='main-input'>
            <button
              onClick={(e) => {
                if (fieldState <= min!) {
                  return;
                }
                CheckNumber(min!, max!, fieldState, (value): void => {
                  context.onChange!(undefined, value - step!, inputName);
                });
              }}>
              −
            </button>
            <input
              min={min}
              max={max}
              type={"number"}
              value={fieldState}
              name={inputName}
              className={`field-input ${fieldState < min! ? "error" : fieldState > max! ? "error" : ""}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                CheckNumber(min!, max!, e.target.valueAsNumber, (value): void => {
                  console.log(value);
                  context.onChange!(e, value);
                });
              }}
            />
            <button
              onClick={() => {
                if (fieldState >= max!) {
                  return;
                }
                CheckNumber(min!, max!, fieldState, (value): void => {
                  context.onChange!(undefined, value + step!, inputName);
                });
              }}>
              +
            </button>
          </div>
          {fieldState < min! ? minBoundError : <></>}
          {fieldState > max! ? maxBoundError : <></>}
          {/* {children ? children : <></>} */}
        </div>
      );
    }
    case "range": {
      const fieldState = state[inputName] && state[inputName].value ? state[inputName].value : initialValue;
      const minMax = {
        min:
          dependencyMin && state[dependencyMin]
            ? state[dependencyMin].value !== undefined
              ? state[dependencyMin].value
              : min
            : min,
        max:
          dependencyMax && state[dependencyMax]
            ? state[dependencyMax].value !== undefined
              ? state[dependencyMax].value
              : max
            : max,
      };
      var percentCalc = ((fieldState - minMax.min) / (minMax.max - minMax.min)) * 100;

      return (
        <div className={className}>
          <input
            min={state[dependencyMin!]}
            max={state[dependencyMax!]}
            name={inputName}
            type={"number"}
            value={fieldState}
            className={`field-input ${fieldState < minMax.min ? "error" : fieldState > minMax.max ? "error" : ""}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              CheckNumber(minMax.min, minMax.max, e.target.valueAsNumber, (value): void => {
                percentCalc = ((value - minMax.min) / (minMax.max - minMax.min)) * 100;
                context.onChange!(e, value);
              });
            }}
          />
          {fieldState < minMax.min ? minBoundError : <></>}
          {fieldState > minMax.max ? maxBoundError : <></>}
          <input
            type={"range"}
            min={minMax.min}
            max={minMax.max}
            name={inputName}
            value={fieldState}
            step={step}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              CheckNumber(minMax.min, minMax.max, e.target.valueAsNumber, (value): void => {
                context.onChange!(e, value);
              });
            }}
          />
          <div className='range-help'>
            {showStep ? <div>{percentCalc.toFixed(0)}%</div> : <span>{`${fieldState} ${prefix}`}</span>}
            {showStep ? <></> : <span>{`${minMax.max} ${prefix}`}</span>}
          </div>
        </div>
      );
    }
    case "checkbox": {
      return (
        <div className={className}>
          <label>
            <input
              style={{ content: state.value === true ? `url(${Checkmark})` : " " }}
              type={"checkbox"}
              name={inputName}
              checked={state ? state.value : initialValue}
              onChange={(e) => context.onChange!(e, !state[inputName].value)}
            />
            {label}
          </label>
        </div>
      );
    }
  }
};
