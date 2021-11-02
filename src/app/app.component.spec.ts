import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TRANSLATIONS } from 'src/test-const';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations(TRANSLATIONS)
      ],
      declarations: [
        AppComponent, HeaderComponent, FooterComponent, MainBodyComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

});


@Component({
  selector: 'app-header',
  template: '<div></div>'
})

class HeaderComponent {

}

@Component({
  selector: 'app-footer',
  template: '<div></div>'
})

class FooterComponent {

}

@Component({
  selector: 'app-main-body',
  template: '<div class="main-body">Main test content</div>'
})

class MainBodyComponent {

}