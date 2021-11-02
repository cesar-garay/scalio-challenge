import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchUsersRequest, SearchUsersResponse } from './search.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  searchUsers(request: SearchUsersRequest): Observable<SearchUsersResponse> {
    let params = new HttpParams();
    Object.keys(request).forEach((paramName: string) => {
      params = params.append(paramName, request[paramName as keyof SearchUsersRequest]);
    });
    return this.httpClient.get<SearchUsersResponse>(`https://api.github.com/search/users`, { params });
  }
}
