import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { BehaviorSubject } from 'rxjs';
import { testRequestResponse, TRANSLATIONS } from 'src/test-const';
import { ListComponent } from './list.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSortHeaderHarness } from '@angular/material/sort/testing';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { SearchUsersResponse } from 'src/app/services/search.interfaces';

describe('ListComponent', () => {
  let parentComponent: ParentMockComponent;
  let fixture: ComponentFixture<ParentMockComponent>;
  let componentInstance: ListComponent;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations(TRANSLATIONS),
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule,
      ],
      declarations: [ParentMockComponent, ListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMockComponent);
    parentComponent = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    componentInstance = fixture.debugElement.query(By.directive(ListComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create parent', () => {
    expect(parentComponent).toBeTruthy();
    expect(componentInstance).toBeTruthy();
  });

  describe('when component init with null value', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should create have empty message', waitForAsync(async () => {
      const emptyElement = fixture.debugElement.query(By.css('.empty-cell'));
      
      expect(emptyElement).toBeTruthy();

    }));
  });

  describe('when component init', () => {
    beforeEach(() => {
      parentComponent.searchResponse.next(testRequestResponse);
      fixture.detectChanges();
    });

    it('should load grid', () => {
      expect(componentInstance.usersList.length).toBe(testRequestResponse.items.length);
    });

    it('should call sort function after click on header login', waitForAsync(async () => {
      const sortElements = await loader.getAllHarnesses(MatSortHeaderHarness);
      const expectedSort: Sort = {
        active: 'login',
        direction: 'asc'
      };

      sortElements[0].click().then(() => {
        fixture.whenStable().then(() => {
          expect(componentInstance.currentSortCol).toEqual(expectedSort.active);
          expect(componentInstance.currentSortDirection).toEqual(expectedSort.direction);
        });
      });
    }));

    it('should update page variables value in the controller after click on paginator', waitForAsync(async () => {
      const paginator = await loader.getAllHarnesses(MatPaginatorHarness);
      const newPageSize = 18;

      paginator[0].setPageSize(newPageSize).then(() => {
        fixture.whenStable().then(() => {
          expect(componentInstance.currentPageIndex).toEqual(0);
          expect(componentInstance.curreentPageSize).toEqual(newPageSize);
        });
      });
    }));

    it('should update observable values after view details button was clicked', waitForAsync(async () => {
      const viewDetails = await loader.getAllHarnesses(MatButtonHarness.with({ selector: '.view-details' }));
      spyOn(componentInstance.viewUserDetails, 'next');

      viewDetails[0].click().then(() => {
        fixture.whenStable().then(() => {
          expect(componentInstance.viewUserDetails.next).toHaveBeenCalledWith(testRequestResponse.items[0]);
        });
      });
    }));

  });
});



@Component({
  selector: 'parent-mock-component',
  template: `<div ><app-list [searchResult]="searchResponse$"></app-list></div>`
})
class ParentMockComponent {
  searchResponse: BehaviorSubject<SearchUsersResponse | null> = new BehaviorSubject<SearchUsersResponse | null>(null);
  searchResponse$ = this.searchResponse.asObservable();
}

