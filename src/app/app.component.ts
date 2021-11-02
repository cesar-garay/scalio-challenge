import { Component, HostBinding, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private darkModeClassName = 'darkMode';
  @HostBinding('class') className = '';

  constructor(private translateService: TranslateService, private themeService: ThemeService) {
    const storedLang = localStorage.getItem('scalioChallengeDefaultLang');
    const currentLang = storedLang ? storedLang : 'en';
    translateService.setDefaultLang(currentLang);
    translateService.use(currentLang);
  }

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe((darkMode: boolean) => {
      this.className = darkMode ? this.darkModeClassName : '';
    });
  }
}
