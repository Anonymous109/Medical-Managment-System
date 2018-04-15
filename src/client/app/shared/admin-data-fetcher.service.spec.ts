import { TestBed, inject } from '@angular/core/testing';

import { AdminDataFetcherService } from './admin-data-fetcher.service';

describe('AdminDataFetcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminDataFetcherService]
    });
  });

  it('should be created', inject([AdminDataFetcherService], (service: AdminDataFetcherService) => {
    expect(service).toBeTruthy();
  }));
});
