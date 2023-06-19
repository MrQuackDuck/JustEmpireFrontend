import { TestBed } from '@angular/core/testing';

import { ServiceVersionRepositoryService } from './service-version-repository.service';

describe('ServiceVersionRepositoryService', () => {
  let service: ServiceVersionRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceVersionRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
