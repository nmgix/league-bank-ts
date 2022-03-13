export interface AnyObject {
  [x: string]: any;
}

export interface ICheckbox extends AnyObject {
  field: string;
  defaultValue: boolean;
  label: string;
  state: AnyObject;
  setState: React.Dispatch<any>;
}
