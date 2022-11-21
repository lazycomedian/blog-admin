import { makeAutoObservable } from "mobx";

export class ThemeStore {
  constructor() {
    makeAutoObservable(this);
  }

  /** 暗黑模式 */
  public isDarkMode: boolean = false;

  public switchDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  /** 色弱模式 */
  public isWeakMode: boolean = false;

  public switchWeakMode() {
    this.isWeakMode = !this.isWeakMode;
  }

  /** 灰度模式 */
  public isGaryMode: boolean = false;

  public switchGaryMode() {
    this.isGaryMode = !this.isGaryMode;
  }
}
