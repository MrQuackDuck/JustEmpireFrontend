import { TestBed } from '@angular/core/testing';

import { LanguageRepositoryService } from './language-repository.service';

describe('LanguageRepositoryService', () => {
  let service: LanguageRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
