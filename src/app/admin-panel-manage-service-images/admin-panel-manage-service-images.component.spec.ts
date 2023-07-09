import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelManageServiceImagesComponent } from './admin-panel-manage-service-images.component';

describe('AdminPanelManageServiceImagesComponent', () => {
  let component: AdminPanelManageServiceImagesComponent;
  let fixture: ComponentFixture<AdminPanelManageServiceImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPanelManageServiceImagesComponent]
    });
    fixture = TestBed.createComponent(AdminPanelManageServiceImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
