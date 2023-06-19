import { Component, Input } from '@angular/core';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { Language } from '../enum/Language';

@Component({
  selector: 'article-pagination',
  templateUrl: './article-pagination.component.html',
  styleUrls: ['./article-pagination.component.css']
})
export class ArticlePaginationComponent {
  constructor(private articleRepository : ArticleRepositoryService) {}

  @Input()
  language : Language;
  
  @Input()
  currentPage : number;

  @Input()
  itemsOnPage : number;
  
  @Input()
  articlesPageName : string;

  languageCode : string;

  pages : number[] = [];

  ngOnInit() {
    this.articleRepository.getPagesCount(this.language, this.itemsOnPage).subscribe(value => {
      for (let i = 1; i <= value; i++) {
        this.pages[i - 1] = i;
      }
    });

    this.languageCode = Language[this.language];
  }
}
