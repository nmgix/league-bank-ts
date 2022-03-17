// import { AnyObject } from "./ICheckbox";

export enum IMapCheckboxesEnum {
  russia,
  sng,
  europe,
}

interface IMapCountries {
  active: boolean;
  coordinates: number[][];
}

export interface IMapCheckboxes {
  russia: IMapCountries;
  sng: IMapCountries;
  europe: IMapCountries;
}
