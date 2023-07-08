import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelManageServiceVersionsComponent } from './admin-panel-manage-service-versions.component';

describe('AdminPanelManageServiceVersionsComponent', () => {
  let component: AdminPanelManageServiceVersionsComponent;
  let fixture: ComponentFixture<AdminPanelManageServiceVersionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPanelManageServiceVersionsComponent]
    });
    fixture = TestBed.createComponent(AdminPanelManageServiceVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
