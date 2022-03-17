// export interface AnyObject<T> {
//   [x: string]: T[keyof T];
// }

export interface AnyObject {
  [x: string]: any;
}

export interface ICheckbox /*<T>*/ extends AnyObject /*<T>*/ {
  field: string;
  // defaultValue: boolean;
  label: string;
  // state: AnyObject /*<T>*/;
  state: boolean;
  // setState: React.Dispatch<any> | (() => void);
  setState: (field: string, state: boolean) => void;
}
