import { useState, createRef, useEffect, useCallback } from "react";
import { changeStateFunc, AvailableKeys } from "../../../interfaces/ICalculator";
import { useAction } from "../../../redux/hooks/useAction";
import { useTypedSelector } from "../../../redux/hooks/useTypedSelector";
import { CheckNumber } from "./FieldWithButtons";

const FieldWithSlider: React.FC<{
  field: AvailableKeys;
  step: number;
  defaultValue: number;
  min: number;
  max: number;
  prefix?: string;
  showStep?: boolean;
  minBoundError?: React.ReactNode;
  maxBoundError?: React.ReactNode;
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
  prefix,
  showStep,
  dependencyMin,
  dependencyMax,
}) => {
  const [fieldState, setFieldState] = useState<number>(defaultValue);
  const [currentPercentage, setCurrentPercentage] = useState<number>(0);
  const [minMax, setMinMax] = useState<{ min: number; max: number }>({
    min,
    max,
  });

  const { state } = useTypedSelector((state) => state.calculator);
  const { SetState } = useAction();
  useEffect(() => {
    if (dependencyMin) {
      setMinMax({ ...minMax, min: state[dependencyMin] });
      setCurrentPercentage(
        !isNaN(((state[field] - state[dependencyMin]) / (minMax.max - state[dependencyMin])) * 100)
          ? ((state[field] - state[dependencyMin]) / (minMax.max - state[dependencyMin])) * 100
          : 0
      );
    }
    if (dependencyMax) {
      setMinMax({ ...minMax, max: state[dependencyMax] });
      setCurrentPercentage(
        !isNaN(((state[field] - minMax.min) / (state[dependencyMax] - minMax.min)) * 100)
          ? ((state[field] - minMax.min) / (state[dependencyMax] - minMax.min)) * 100
          : 0
      );
    }
  }, [state]);

  useEffect(() => {
    if (!state || state[field] == null) {
      SetState(field, defaultValue);
    } else {
      setFieldState(state[field]);
    }
  }, [state]);

  return (
    <div className='field-slider' key={field}>
      <input
        min={minMax.min}
        max={minMax.max}
        type={"number"}
        value={fieldState}
        className={`field-input ${fieldState < minMax.min ? "error" : fieldState > minMax.max ? "error" : ""}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          CheckNumber(minMax.min, minMax.max, e.target.valueAsNumber, (value): void => {
            setCurrentPercentage(((value - minMax.min) / (minMax.max - minMax.min)) * 100);
            SetState(field, value);
            setFieldState(value);
          });
        }}
      />
      {fieldState < minMax.min ? minBoundError : <></>}
      {fieldState > minMax.max ? maxBoundError : <></>}
      <input
        type={"range"}
        min={minMax.min}
        max={minMax.max}
        value={fieldState}
        step={step}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          CheckNumber(minMax.min, minMax.max, e.target.valueAsNumber, (value): void => {
            setCurrentPercentage(((value - minMax.min) / (minMax.max - minMax.min)) * 100);

            SetState(field, value);
            setFieldState(value);
          });
        }}
      />
      <div className='range-help'>
        {showStep ? <div>{currentPercentage.toFixed(0)}%</div> : <span>{`${fieldState} ${prefix}`}</span>}
        {showStep ? <></> : <span>{`${minMax.max} ${prefix}`}</span>}
      </div>
      {children ? children : <></>}
    </div>
  );
};

export { FieldWithSlider };
