// import { AnyObject } from "./ICheckbox";

interface IMapCountries {
  active: boolean;
  coordinates: number[][];
}

export interface IMapCheckboxes {
  russia: IMapCountries;
  sng: IMapCountries;
  europe: IMapCountries;
}
