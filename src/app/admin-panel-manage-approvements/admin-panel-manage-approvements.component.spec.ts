import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelManageApprovementsComponent } from './admin-panel-manage-approvements.component';

describe('AdminPanelManageApprovementsComponent', () => {
  let component: AdminPanelManageApprovementsComponent;
  let fixture: ComponentFixture<AdminPanelManageApprovementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPanelManageApprovementsComponent]
    });
    fixture = TestBed.createComponent(AdminPanelManageApprovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
