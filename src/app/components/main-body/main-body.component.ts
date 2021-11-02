import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GithubOrderOptions, SearchUserItem, SearchUsersRequest, SearchUsersResponse } from 'src/app/services/search.interfaces';
import { SearchService } from 'src/app/services/search.service';
import { PageSortChanged } from '../list/list.component';
import { SearchFormResult } from '../search/search.component';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})
export class MainBodyComponent implements OnDestroy {
  currentPage = 1;
  itemsPerPage = 9;
  currentSearchValue = '';
  sortField = 'login';
  sortOrder: GithubOrderOptions = GithubOrderOptions.asc;
  searchResponse: BehaviorSubject<SearchUsersResponse | null> = new BehaviorSubject<SearchUsersResponse | null>(null);
  searchResponse$ = this.searchResponse.asObservable();
  openDetails = false;
  selectedUserDetails!: SearchUserItem;
  private subscription = new Subscription();

  constructor(private searchService: SearchService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  searchValueChange(values: SearchFormResult) {
    this.currentSearchValue = values.login;
    this.currentPage = 1;
    this.search();
  }

  pageSortChanged(data: PageSortChanged): void {
    this.currentPage = data.currentPage;
    this.itemsPerPage = data.pageSize;
    this.sortField = data.currentSortCol;
    this.sortOrder = data.currentSortDirection;
    this.search();
  }

  viewUserDetails(userData: SearchUserItem): void {
    this.selectedUserDetails = userData;
    this.openDetails = true;
  }

  private search(): void {
    const params: SearchUsersRequest = {
      q: `${this.currentSearchValue} in:login`,
      page: this.currentPage,
      per_page: this.itemsPerPage,
      sort: this.sortField,
      order: this.sortOrder
    };

    this.subscription.add(this.searchService.searchUsers(params).subscribe((response) => {
      response.currentPage = this.currentPage;
      this.searchResponse.next(response);
    }));
  }
}
