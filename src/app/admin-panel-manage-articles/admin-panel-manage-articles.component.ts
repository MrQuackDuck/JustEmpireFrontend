import { Component } from '@angular/core';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { Article } from '../model/article';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    {key: 'English', value: 0},
    {key: 'Ukrainian', value: 1},
  ];

  ngOnInit() {
    this.articles$ = this.articleRepository.getAll();
    this.newArticleForm = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      titleImage: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      language : new FormControl(0, Validators.required)
    });
  }

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let file = fileList[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let label : any = document.querySelector('.upload-photo-label')
        label.innerHTML = "<img src='"+ reader.result +"'>";
        this.newArticleForm.controls['titleImage'].setValue(reader.result);
      };
    }
  }

  submitNewArticle() {
    if (this.newArticleForm.valid === false) {
      return; 
    }
    
    this.articleRepository.create(this.newArticleForm.getRawValue()).subscribe();
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
