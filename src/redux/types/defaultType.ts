import { ReactElement, ReactNode } from "react";

export type AnyState<T> = { [index in keyof T]: T[index] | null };

// // @ https://stackoverflow.com/questions/35482241/how-to-type-redux-actions-and-redux-reducers-in-typescript
// // вообще искал почему не типизировало редьюсер, но попутно нашёл как упростить создание экшенов

export type Action<T, P> = {
  readonly type: T;
  readonly payload: P;
};

// export function createAction<T extends string, P>(type: T, payload: P): Action<T, P> {
//   return { type, payload };
// }

export type ErrorPayload = string | string[];
