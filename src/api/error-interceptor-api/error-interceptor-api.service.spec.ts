import { TestBed } from '@angular/core/testing';

import { ErrorInterceptorApiService } from './error-interceptor-api.service';

describe('ErrorInterceptorApiService', () => {
  let service: ErrorInterceptorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorInterceptorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
