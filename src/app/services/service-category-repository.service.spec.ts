import { TestBed } from '@angular/core/testing';

import { ServiceCategoryRepositoryService } from './service-category-repository.service';

describe('ServiceCategoryRepositoryService', () => {
  let service: ServiceCategoryRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCategoryRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
