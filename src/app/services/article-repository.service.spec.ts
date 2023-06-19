import { TestBed } from '@angular/core/testing';

import { ArticleRepositoryService } from './article-repository.service';

describe('ArticleRepositoryService', () => {
  let service: ArticleRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
