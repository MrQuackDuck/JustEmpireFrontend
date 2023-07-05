import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelManageServicesComponent } from './admin-panel-manage-services.component';

describe('AdminPanelManageServicesComponent', () => {
  let component: AdminPanelManageServicesComponent;
  let fixture: ComponentFixture<AdminPanelManageServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPanelManageServicesComponent]
    });
    fixture = TestBed.createComponent(AdminPanelManageServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
