import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import { CustomPaginatorIntl } from 'src/app/services/material-custom-paginator';
import { GithubOrderOptions, SearchUserItem, SearchUsersResponse } from 'src/app/services/search.interfaces';

export interface PageSortChanged {
  currentPage: number;
  pageSize: number;
  currentSortCol: string;
  currentSortDirection: GithubOrderOptions;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class ListComponent implements OnInit, OnDestroy {
  totalResult = 0;
  usersList: SearchUserItem[] = [];
  currentPageIndex = 0;
  curreentPageSize = 9;
  currentSortCol = 'login';
  currentSortDirection = GithubOrderOptions.asc;
  displayedColumns: string[] = ['avatar_url', 'login', 'type', 'action'];

  @Input('searchResult') searchResult!: Observable<SearchUsersResponse | null>;
  @Output('pageSortChanged') pageSortChanged: EventEmitter<PageSortChanged> = new EventEmitter();
  @Output('viewUserDetails') viewUserDetails: EventEmitter<SearchUserItem> = new EventEmitter();

  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(this.searchResult.subscribe((results) => {
      if (results) {
        this.usersList = results.items;
        this.totalResult = results.total_count;
        this.currentPageIndex = results.currentPage ? results.currentPage - 1 : 0;
      }
    }));
  }

  viewDetails(user: SearchUserItem): void {
    this.viewUserDetails.next(user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pageChange(data: PageEvent): void {
    this.currentPageIndex = data.pageIndex;
    this.curreentPageSize = data.pageSize;
    this.emitPageChanged();
  }

  sortData(sort: Sort) {
    this.currentSortCol = sort.active;
    this.currentSortDirection = sort.direction === GithubOrderOptions.desc ? GithubOrderOptions.desc : GithubOrderOptions.asc;
    this.currentPageIndex = 0;
    this.emitPageChanged();
  }

  private emitPageChanged(): void {
    this.pageSortChanged.next({
      currentPage: this.currentPageIndex + 1,
      pageSize: this.curreentPageSize,
      currentSortCol: this.currentSortCol,
      currentSortDirection: this.currentSortDirection
    })
  }
}
