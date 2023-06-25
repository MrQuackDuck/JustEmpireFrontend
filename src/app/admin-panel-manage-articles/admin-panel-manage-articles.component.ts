import { Component } from '@angular/core';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { Article } from '../model/article';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Language } from '../enum/Language';

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
  public newArticleEditor;

  languages = [
    {key: 'English', value: 'EN'},
    {key: 'Ukrainian', value: 'UA'},
  ];

  ngOnInit() {
    this.articles$ = this.articleRepository.getAll();
    this.newArticleForm = this.formBuilder.group({
      title: '',
      titleImage: '',
      text: '',
      language : Language
    });
  }

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log(fileList[0].name);
      console.log(fileList[0]);
    }
  }


  submitNewArticle() {
    console.log(this.newArticleForm.getRawValue());
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
