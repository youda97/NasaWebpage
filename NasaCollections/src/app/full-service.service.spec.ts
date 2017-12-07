import { TestBed, inject } from '@angular/core/testing';

import { FullServiceService } from './full-service.service';

describe('FullServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FullServiceService]
    });
  });

  it('should be created', inject([FullServiceService], (service: FullServiceService) => {
    expect(service).toBeTruthy();
  }));
});
