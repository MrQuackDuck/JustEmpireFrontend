import { TestBed } from '@angular/core/testing';

import { AdminSelectedTabService } from './admin-selected-tab.service';

describe('AdminSelectedTabService', () => {
  let service: AdminSelectedTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSelectedTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
