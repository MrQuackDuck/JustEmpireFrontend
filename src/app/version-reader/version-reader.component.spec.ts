import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionReaderComponent } from './version-reader.component';

describe('VersionReaderComponent', () => {
  let component: VersionReaderComponent;
  let fixture: ComponentFixture<VersionReaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VersionReaderComponent]
    });
    fixture = TestBed.createComponent(VersionReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
