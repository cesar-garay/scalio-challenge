import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  languageSelector!: FormControl;
  toggleDarkMode = new FormControl(false);

  private subscription = new Subscription();

  constructor(private translateService: TranslateService, private themeService: ThemeService) { }

  ngOnInit(): void {
    const storedLang = localStorage.getItem('scalioChallengeDefaultLang');
    const currentLang = storedLang ? storedLang : 'en';
    this.languageSelector = new FormControl(currentLang);
    this.subscription.add(this.languageSelector.valueChanges.subscribe((newLangValue: string) => {
      localStorage.setItem('scalioChallengeDefaultLang', newLangValue);
      this.translateService.use(newLangValue);
    }));

    this.subscription.add(this.toggleDarkMode.valueChanges.subscribe((darkMode) => {
      this.themeService.setDarkMode(darkMode);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
