import { AnyObject } from "./ICheckbox";

export enum IMapCheckboxesEnum {
  russia,
  sng,
  europe,
}

export interface IMapCheckboxes extends AnyObject {
  russia: boolean;
  sng: boolean;
  europe: boolean;
}
