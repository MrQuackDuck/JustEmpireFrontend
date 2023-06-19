import { TestBed } from '@angular/core/testing';

import { ServiceImageRepositoryService } from './service-image-repository.service';

describe('ServiceScreenshotRepositoryService', () => {
  let service: ServiceImageRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceImageRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
