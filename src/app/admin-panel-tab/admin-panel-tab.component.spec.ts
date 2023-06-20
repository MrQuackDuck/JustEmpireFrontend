import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelTabComponent } from './admin-panel-tab.component';

describe('AdminPanelTabComponent', () => {
  let component: AdminPanelTabComponent;
  let fixture: ComponentFixture<AdminPanelTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPanelTabComponent]
    });
    fixture = TestBed.createComponent(AdminPanelTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
