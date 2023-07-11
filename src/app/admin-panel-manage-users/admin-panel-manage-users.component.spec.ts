import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelManageUsersComponent } from './admin-panel-manage-users.component';

describe('AdminPanelManageUsersComponent', () => {
  let component: AdminPanelManageUsersComponent;
  let fixture: ComponentFixture<AdminPanelManageUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPanelManageUsersComponent]
    });
    fixture = TestBed.createComponent(AdminPanelManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
