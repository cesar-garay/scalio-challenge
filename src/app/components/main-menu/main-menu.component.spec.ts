import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { By } from '@angular/platform-browser';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TRANSLATIONS } from 'src/test-const';
import { MainMenuComponent } from './main-menu.component';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonToggleHarness } from '@angular/material/button-toggle/testing';
import { ThemeService } from 'src/app/services/theme.service';

describe('MainMenuComponent', () => {
  let parentComponent: ParentMockComponent;
  let fixture: ComponentFixture<ParentMockComponent>;
  let componentInstance: MainMenuComponent;
  let loader: HarnessLoader;

  let ThemeServiceSpy: {
    setDarkMode: jasmine.Spy
  };

  beforeEach(fakeAsync(() => {
    ThemeServiceSpy = jasmine.createSpyObj('ThemeService', ['setDarkMode']);
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations(TRANSLATIONS),
        MatButtonToggleModule,
        MatSlideToggleModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ParentMockComponent, MainMenuComponent],
      providers: [
        { provide: ThemeService, useValue: ThemeServiceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMockComponent);
    parentComponent = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    componentInstance = fixture.debugElement.query(By.directive(MainMenuComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create parent', () => {
    expect(parentComponent).toBeTruthy();
  });
  it('should create component', () => {
    expect(componentInstance).toBeTruthy();
  });

  describe('when darkMode change', () => {
    it('should call the theme service to set darkmode in true', waitForAsync(async () => {
      const themeSlideToggle = await loader.getAllHarnesses(MatSlideToggleHarness);

      themeSlideToggle[0].check().then(() => {
        expect(ThemeServiceSpy.setDarkMode).toHaveBeenCalledWith(true);
      });
    }));
  });

  describe('when language change', () => {
    it('should store the selected language in the localstorage', waitForAsync(async () => {
      const languageToggle = await loader.getAllHarnesses(MatButtonToggleHarness);
      languageToggle[0].check().then(() => {
        languageToggle[1].check().then(() => {
          const storedLang = localStorage.getItem('scalioChallengeDefaultLang');

          expect(storedLang).toBe('es');
        });
      });
    }));
  });
});

@Component({
  selector: 'parent-mock-component',
  template: `<div class="main-body"><app-main-menu></app-main-menu></div>`
})
class ParentMockComponent {

}