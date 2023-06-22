import { Component } from '@angular/core';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { Article } from '../model/article';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Language } from '../enum/Language';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-admin-panel-manage-articles',
  templateUrl: './admin-panel-manage-articles.component.html',
  styleUrls: ['./admin-panel-manage-articles.component.css']
})
export class AdminPanelManageArticlesComponent {
  constructor(private articleRepository : ArticleRepositoryService, private formBuilder : FormBuilder) {}

  articles$ : Observable<Article[]>;
  newArticleModalShown : boolean;
  newArticleForm : FormGroup;
  public newArticleEditor = ClassicEditor;

  ngOnInit() {
    this.articles$ = this.articleRepository.getAll();
    this.newArticleForm = this.formBuilder.group({
      title: '',
      titleImage: '',
      text: '',
      language : Language
    });
  }

  showNewArticleModal() {
    this.newArticleModalShown = true;
  }

  hideNewArticleModal() {
    this.newArticleModalShown = false;
  }

  closeAllModals() {
    this.newArticleModalShown = false;
  }
}
