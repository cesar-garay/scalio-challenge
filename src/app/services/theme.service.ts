import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  protected currentIsDarkMode = false;
  protected isDarkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.currentIsDarkMode);
  isDarkMode$ = this.isDarkMode.asObservable();

  setDarkMode(value: boolean): void {
    this.currentIsDarkMode = value;
    this.isDarkMode.next(this.currentIsDarkMode);
  }
}
