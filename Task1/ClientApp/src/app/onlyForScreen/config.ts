import { Injectable } from "@angular/core";
import { IConfig } from "./IConfig";

@Injectable({
  providedIn: 'root',
})

export class Config implements IConfig {
  mobile: number;
  tablet: number;

  constructor() {
    this.mobile = 768;
    this.tablet = 992;
  }

}