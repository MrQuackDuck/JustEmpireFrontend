import { TestBed } from '@angular/core/testing';

import { ServiceRepositoryService } from './service-repository.service';

describe('ServiceRepositoryService', () => {
  let service: ServiceRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
