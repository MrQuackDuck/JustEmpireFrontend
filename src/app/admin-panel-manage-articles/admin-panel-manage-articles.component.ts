import { Component } from '@angular/core';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { Article } from '../model/article';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-panel-manage-articles',
  templateUrl: './admin-panel-manage-articles.component.html',
  styleUrls: ['./admin-panel-manage-articles.component.css']
})
export class AdminPanelManageArticlesComponent {
  constructor(private articleRepository : ArticleRepositoryService) {}

  articles$ : Observable<Article[]>;

  ngOnInit() {
    this.articles$ = this.articleRepository.getAll();
  }
}
