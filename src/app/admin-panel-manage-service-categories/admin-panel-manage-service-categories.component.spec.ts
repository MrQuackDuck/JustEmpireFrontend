import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelManageServiceCategoriesComponent } from './admin-panel-manage-service-categories.component';

describe('AdminPanelManageServiceCategoriesComponent', () => {
  let component: AdminPanelManageServiceCategoriesComponent;
  let fixture: ComponentFixture<AdminPanelManageServiceCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPanelManageServiceCategoriesComponent]
    });
    fixture = TestBed.createComponent(AdminPanelManageServiceCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
