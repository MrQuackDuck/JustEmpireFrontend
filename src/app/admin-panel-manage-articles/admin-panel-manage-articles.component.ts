import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { Article } from '../model/article';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-admin-panel-manage-articles',
  templateUrl: './admin-panel-manage-articles.component.html',
  styleUrls: ['./admin-panel-manage-articles.component.css']
})
export class AdminPanelManageArticlesComponent {
  constructor(private articleRepository : ArticleRepositoryService, private formBuilder : FormBuilder, 
  private loadingService : LoadingService) {}

  articles : Article[];

  newArticleModalShown : boolean;
  newArticleForm : FormGroup;

  successModalShown : boolean;
  failModalShown : boolean;

  currentArticleEdited? : Article;
  editArticleForm : FormGroup;
  editArticleModalShown : boolean;

  languages = [
    {key: '🇬🇧 English', value: 0},
    {key: '🇺🇦 Ukrainian', value: 1},
  ];

  ngOnInit() {
    this.loadingService.enableLoading();
    this.articleRepository.getAll().subscribe((articles) => {
      this.articles = articles;
      this.loadingService.disableLoading();
    });
    
    // Setting up input forms
    this.newArticleForm = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      titleImage: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      language : new FormControl(0, Validators.required)
    });

    this.editArticleForm = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      titleImage: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      language : new FormControl(0, Validators.required)
    });
  }

  uploadFile(event: Event, targetForm : FormGroup, browseLabel : string) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let file = fileList[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let label : any = document.querySelector(browseLabel)
        label.innerHTML = "<img src='"+ reader.result +"'>";
        try {
          targetForm.controls['titleImage'].setValue(reader.result);
        } catch { }
      };
    }
  }

  submitNewArticle() {
    if (this.newArticleForm.valid === false) {
      return; 
    }

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.articleRepository.create(this.newArticleForm.getRawValue()).subscribe(
      success => {
        this.loadingService.disableLoading();
        this.successModalShown = true;
        this.newArticleForm.reset();
      },
      fail => {
        this.loadingService.disableLoading();
        this.failModalShown = true;
      });
  }

  showEditModal(id : number) {
    let targetArticle = this.articles.find(article => article.id === id)
    if (targetArticle) {
      this.editArticleModalShown = true; // Show modal of article that being edited
      this.currentArticleEdited = targetArticle;

      this.editArticleForm.controls['title'].setValue(targetArticle.title);
      this.editArticleForm.controls['text'].setValue(targetArticle.text);
      this.editArticleForm.controls['language'].setValue(targetArticle.language);
      this.editArticleForm.controls['titleImage'].setValue(targetArticle.titleImage);
      
      let label : any = document.querySelector('.upload-photo-label-edit')
      label.innerHTML = "<img src='"+ targetArticle.titleImage +"'>";
    }
  }

  submitEditedArticle() {
    if (this.editArticleForm.valid === false) {
      return; 
    }

    console.log(this.editArticleForm.getRawValue());
  }

  closeAllModals() {
    this.newArticleModalShown = false;
    this.successModalShown = false;
    this.failModalShown = false;
    this.editArticleModalShown = false;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
