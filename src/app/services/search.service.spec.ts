import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { testRequestResponse } from 'src/test-const';
import { SearchUsersRequest } from './search.interfaces';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when search users function is called', () => {
    it('shoud return SearchUsersResponse', () => {
      const result = testRequestResponse;
      const requestParams: SearchUsersRequest = {
        q: 'test',
        sort: 'login',
        order: 'desc',
        per_page: 10,
        page: 1
      }

      service.searchUsers(requestParams).subscribe((result) => {
        expect(result.total_count).toBe(2);
      });

      const request = httpMock.expectOne(`https://api.github.com/search/users?q=test&sort=login&order=desc&per_page=10&page=1`);
      expect(request.request.method).toBe('GET');

      request.flush(result);
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
