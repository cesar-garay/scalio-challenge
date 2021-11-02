import { TestBed, waitForAsync } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('when dark mode is setted', () => {
    it('shoud update is dark mode status', waitForAsync(async () => {
      service.setDarkMode(true);

      service.isDarkMode$.subscribe((value) => {
        expect(value).toBeTrue();
      })
    }));
  });
});
