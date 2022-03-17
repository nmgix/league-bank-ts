import React, { createContext, useState } from "react";
import { TextInputBaseInterface } from "../../interfaces/ICalculator";

// @ https://stackoverflow.com/questions/55757761/handle-an-input-with-react-hooks

type Context = {
  onChange:
    | ((
        event: React.ChangeEvent<HTMLInputElement> | undefined,
        value?: string | number | boolean,
        name?: string
      ) => void)
    | null;
  state: any;
  setInputInitialState: ((state: TextInputBaseInterface) => void) | null;
  resetState: (() => void) | null;
};

export const Context = createContext<Context>({
  onChange: null,
  state: null,
  setInputInitialState: null,
  resetState: null,
});

export const ContextWraper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<{ [x: string]: { [x: string]: any } }>({});

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement> | undefined,
    value?: string | number | boolean,
    name?: string
  ) => {
    if (name !== undefined) {
      setState((prevState: any) => {
        return {
          ...prevState,
          [name]: {
            ...prevState[name],
            value: value,
          },
        };
      });
    } else if (value !== undefined && event !== undefined) {
      setState((prevState: any) => {
        return {
          ...prevState,
          [event.target.name]: {
            ...prevState[event.target.name],
            value: value,
          },
        };
      });
    } else if (event !== undefined) {
      setState((prevState: any) => {
        return {
          ...prevState,
          [event.target.name]: {
            ...prevState[event.target.name],
            value: event.target.value,
          },
        };
      });
    }
  };

  const setInitialValue = (state: TextInputBaseInterface) => {
    const { type, min, max, inputName, initialValue, value } = state;

    const initialState = {
      type,
      min,
      max,
      inputName,
      initialValue,
      value,
    };

    setState((prevState: any) => {
      if (inputName in prevState) {
        return prevState;
      }
      return {
        ...prevState,
        [inputName]: initialState,
      };
    });
  };

  const resetState = () => {
    setState({});
  };

  return (
    <Context.Provider
      value={{
        onChange,
        state: state,
        setInputInitialState: setInitialValue,
        resetState,
      }}>
      <>{children}</>
    </Context.Provider>
  );
};
