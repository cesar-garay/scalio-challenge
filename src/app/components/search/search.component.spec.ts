import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TRANSLATIONS } from 'src/test-const';
import { SearchComponent } from './search.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('SearchComponent', () => {
  let parentComponent: ParentMockComponent;
  let fixture: ComponentFixture<ParentMockComponent>;
  let componentInstance: SearchComponent;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations(TRANSLATIONS),
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ParentMockComponent, SearchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMockComponent);
    parentComponent = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    componentInstance = fixture.debugElement.query(By.directive(SearchComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create parent', () => {
    expect(parentComponent).toBeTruthy();
  });
  it('should create component', () => {
    expect(componentInstance).toBeTruthy();
  });
  describe('when button is clicked with an empty value', () => {
    it('should display error', waitForAsync(async () => {
      const searchButton = await loader.getAllHarnesses(MatButtonHarness.with({ selector: '.search-button' }));


      searchButton[0].click().then(() => {
        const errorElement = fixture.debugElement.query(By.css('.error-message'));
        expect(errorElement).toBeTruthy();
      });
    }));

  });
  describe('when input value change and search button is clicked', () => {
    beforeEach(() => {
      componentInstance.loginControl.setValue('test');
      fixture.detectChanges();
    });

    it('should trigger search', waitForAsync(async () => {
      const searchButton = await loader.getAllHarnesses(MatButtonHarness.with({ selector: '.search-button' }));
      spyOn(componentInstance.searchFormValues, 'next');

      searchButton[0].click().then(() => {

        expect(componentInstance.searchFormValues.next).toHaveBeenCalledWith({ login: 'test' });
      });
    }));

  });
});



@Component({
  selector: 'parent-mock-component',
  template: `<div class="main-body"><app-search></app-search></div>`
})
class ParentMockComponent {

}
