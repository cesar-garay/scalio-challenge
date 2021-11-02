import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TRANSLATIONS } from 'src/test-const';
import { FooterComponent } from './footer.component';


describe('FooterComponent', () => {
  let parentComponent: ParentMockComponent;
  let fixture: ComponentFixture<ParentMockComponent>;
  let componentInstance: FooterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations(TRANSLATIONS)
      ],
      declarations: [ParentMockComponent, FooterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMockComponent);
    parentComponent = fixture.componentInstance;
    fixture.detectChanges();
    componentInstance = fixture.debugElement.query(By.directive(FooterComponent)).componentInstance;
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
  template: `<div class="main-body"><app-footer></app-footer></div>`
})
class ParentMockComponent {
 
}