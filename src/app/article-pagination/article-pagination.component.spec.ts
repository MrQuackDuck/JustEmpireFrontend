import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePaginationComponent } from './article-pagination.component';

describe('ArticlePaginationComponent', () => {
  let component: ArticlePaginationComponent;
  let fixture: ComponentFixture<ArticlePaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlePaginationComponent]
    });
    fixture = TestBed.createComponent(ArticlePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
