import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { testUser1, TRANSLATIONS } from 'src/test-const';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let parentComponent: ParentMockComponent;
  let fixture: ComponentFixture<ParentMockComponent>;
  let componentInstance: DetailsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations(TRANSLATIONS)
      ],
      declarations: [ParentMockComponent, DetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMockComponent);
    parentComponent = fixture.componentInstance;
    fixture.detectChanges();
    componentInstance = fixture.debugElement.query(By.directive(DetailsComponent)).componentInstance;
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
  template: `<div class="main-body"><app-details [user]="selectedUserDetails"></app-details></div>`
})
class ParentMockComponent {
  selectedUserDetails = testUser1;
}