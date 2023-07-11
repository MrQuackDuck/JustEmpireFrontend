import { TestBed } from '@angular/core/testing';

import { RankRepositoryService } from './rank-repository.service';

describe('RankRepositoryService', () => {
  let service: RankRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
