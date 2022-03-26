export interface AnyObject {
  [x: string]: any;
}

export interface ICheckbox /*<T>*/ extends AnyObject /*<T>*/ {
  field: string;
  label: string;
  state: boolean;
  setState: (field: string, state: boolean) => void;
}
