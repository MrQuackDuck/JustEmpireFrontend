import { TestBed } from '@angular/core/testing';

import { ApprovementsService } from './approvements.service';

describe('ApprovementsService', () => {
  let service: ApprovementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
