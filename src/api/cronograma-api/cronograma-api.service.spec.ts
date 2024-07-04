import { TestBed } from '@angular/core/testing';

import { CronogramaApiService } from './cronograma-api.service';

describe('CronogramaApiService', () => {
  let service: CronogramaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CronogramaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
