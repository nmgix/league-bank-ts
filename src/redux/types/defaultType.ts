export interface defaultAction /*<T>*/ {
  type: /*keyof T*/ string;
  payload?: any;
  // error?: string;
}

export type AnyState<T> = { [index in keyof T]: T[index] | null };
