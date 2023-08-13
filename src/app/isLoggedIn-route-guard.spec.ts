import { TestBed } from '@angular/core/testing';

import { isLoggedInService } from './isLoggedIn-route-guard';

describe('isLoggedInService', () => {
  let service: isLoggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(isLoggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
