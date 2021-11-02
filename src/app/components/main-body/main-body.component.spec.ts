import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { GithubOrderOptions, SearchUserItem, SearchUsersResponse } from 'src/app/services/search.interfaces';
import { SearchService } from 'src/app/services/search.service';
import { testRequestResponse, TRANSLATIONS } from 'src/test-const';
import { PageSortChanged } from '../list/list.component';
import { SearchFormResult } from '../search/search.component';
import { MainBodyComponent } from './main-body.component';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('MainBodyComponent', () => {
  let parentComponent: ParentMockComponent;
  let fixture: ComponentFixture<ParentMockComponent>;
  let componentInstance: MainBodyComponent;
  let loader: HarnessLoader;

  let SearchServiceSpy: {
    searchUsers: jasmine.Spy
  };
  const usersSubject = new BehaviorSubject<SearchUsersResponse>(testRequestResponse);

  beforeEach(fakeAsync(() => {
    SearchServiceSpy = jasmine.createSpyObj('SearchService', ['searchUsers']);
    SearchServiceSpy.searchUsers.and.returnValue(usersSubject);
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations(TRANSLATIONS),
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      declarations: [ParentMockComponent, MainBodyComponent, SearchComponent, ListComponent, DetailsComponent],
      providers: [
        { provide: SearchService, useValue: SearchServiceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMockComponent);
    parentComponent = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    componentInstance = fixture.debugElement.query(By.directive(MainBodyComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create parent', () => {
    expect(parentComponent).toBeTruthy();
  });
  it('should create component', () => {
    expect(componentInstance).toBeTruthy();
  });
  describe('when search is triggered', () => {
    beforeEach(() => {
      const searchComponent = fixture.debugElement.query(By.directive(SearchComponent)).componentInstance;
      searchComponent.searchFormValues.next({ login: 'test' });
      fixture.detectChanges();
    });

    it('should update the current value search', () => {
      expect(componentInstance.currentSearchValue).toBe('test');
    });

    it('should call search service', () => {
      expect(SearchServiceSpy.searchUsers).toHaveBeenCalled();
    });

  });
  describe('when page or sort change is triggered', () => {
    beforeEach(() => {
      const listComponent = fixture.debugElement.query(By.directive(ListComponent)).componentInstance;
      const pageSortValues = {
        currentPage: 2,
        pageSize: 18,
        currentSortCol: 'login',
        currentSortDirection: GithubOrderOptions.desc
      }
      listComponent.pageSortChanged.next(pageSortValues);
      fixture.detectChanges();
    });

    it('should update the current sort and pagination values', () => {
      expect(componentInstance.currentPage).toBe(2);
      expect(componentInstance.itemsPerPage).toBe(18);
      expect(componentInstance.sortField).toBe('login');
      expect(componentInstance.sortOrder).toBe(GithubOrderOptions.desc);
    });

    it('should call search service', () => {
      expect(SearchServiceSpy.searchUsers).toHaveBeenCalled();
    });
  });
  describe('when view details was triggered', () => {
    beforeEach(() => {
      const listComponent = fixture.debugElement.query(By.directive(ListComponent)).componentInstance;
      listComponent.viewUserDetails.next(testRequestResponse.items[0])
      fixture.detectChanges();
    });

    it('should update the current sort and pagination values', () => {
      expect(componentInstance.selectedUserDetails).toBe(testRequestResponse.items[0]);
      expect(componentInstance.openDetails).toBeTrue();
    });

    it('should display sidenav with details', waitForAsync(async () => {
      const closeButton = await loader.getAllHarnesses(MatButtonHarness.with({ selector: '.close-details-button' }));

      expect(closeButton).toBeTruthy();
    }));
  });
});

@Component({
  selector: 'parent-mock-component',
  template: `<div class="parent"><app-main-body></app-main-body></div>`
})
class ParentMockComponent {

}

@Component({
  selector: 'app-search',
  template: `<div>search</div>`
})
class SearchComponent {
  @Output() searchFormValues: EventEmitter<SearchFormResult> = new EventEmitter();
}

@Component({
  selector: 'app-list',
  template: `<div>list</div>`
})
class ListComponent {
  @Input('searchResult') searchResult!: Observable<SearchUsersResponse | null>;
  @Output('pageSortChanged') pageSortChanged: EventEmitter<PageSortChanged> = new EventEmitter();
  @Output('viewUserDetails') viewUserDetails: EventEmitter<SearchUserItem> = new EventEmitter();
}

@Component({
  selector: 'app-details',
  template: `<div>details</div>`
})
class DetailsComponent {
  @Input('user') user!: SearchUserItem;
}