import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelStatsComponent } from './admin-panel-stats.component';

describe('AdminPanelStatsComponent', () => {
  let component: AdminPanelStatsComponent;
  let fixture: ComponentFixture<AdminPanelStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPanelStatsComponent]
    });
    fixture = TestBed.createComponent(AdminPanelStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
