import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TRANSLATIONS } from 'src/test-const';
import { HeaderComponent } from './header.component';


describe('HeaderComponent', () => {
  let parentComponent: ParentMockComponent;
  let fixture: ComponentFixture<ParentMockComponent>;
  let componentInstance: HeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations(TRANSLATIONS),
        MatToolbarModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [ParentMockComponent, HeaderComponent, MainMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMockComponent);
    parentComponent = fixture.componentInstance;
    fixture.detectChanges();
    componentInstance = fixture.debugElement.query(By.directive(HeaderComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create parent', () => {
    expect(parentComponent).toBeTruthy();
  });
  it('should create component', () => {
    expect(componentInstance).toBeTruthy();
  });
});



@Component({
  selector: 'parent-mock-component',
  template: `<div class="main-body"><app-header></app-header></div>`
})
class ParentMockComponent {

}

@Component({
  selector: 'app-main-menu',
  template: '<div></div>'
})

class MainMenuComponent {

}