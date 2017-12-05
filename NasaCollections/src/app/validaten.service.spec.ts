import { TestBed, inject } from '@angular/core/testing';

import { ValidatenService } from './validaten.service';

describe('ValidatenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidatenService]
    });
  });

  it('should be created', inject([ValidatenService], (service: ValidatenService) => {
    expect(service).toBeTruthy();
  }));
});
