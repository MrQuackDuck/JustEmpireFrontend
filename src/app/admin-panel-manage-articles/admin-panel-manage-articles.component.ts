import { Component, ElementRef, Renderer2, ViewChild, ViewChildren } from '@angular/core';
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
  private loadingService : LoadingService, private renderer: Renderer2) {}

  articles : Article[];

  newArticleModalShown : boolean;
  newArticleForm : FormGroup;

  successModalShown : boolean;
  failModalShown : boolean;

  currentArticleEdited? : Article;
  editArticleForm : FormGroup;
  editArticleModalShown : boolean;

  confirmDeleteModalShown : boolean;
  articleToDelete? : Article;

  languages = [
    {key: '🇬🇧 English', value: 0},
    {key: '🇺🇦 Ukrainian', value: 1},
  ];

  ngOnInit() {
    this.updateData()
    
    // Setting up input forms
    this.newArticleForm = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      titleImage: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      language : new FormControl(0, Validators.required)
    });

    this.editArticleForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      titleImage: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      language : new FormControl(0, Validators.required)
    });
  }

  uploadFile(event: Event, targetForm : FormGroup, browseLabel : HTMLLabelElement) {
    console.log(browseLabel);
    
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let file = fileList[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        browseLabel.innerHTML = "<img src='"+ reader.result +"'>";
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
        this.updateData()
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

      this.editArticleForm.controls['id'].setValue(targetArticle.id);
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

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.articleRepository.edit(this.editArticleForm.getRawValue()).subscribe(
      success => {
        this.loadingService.disableLoading();
        this.successModalShown = true;
        this.newArticleForm.reset();
        this.updateData()
      },
      fail => {
        this.loadingService.disableLoading();
        this.failModalShown = true;
      });
  }

  showArticleDeleteModal(article : Article) {
    this.articleToDelete = article;
    this.confirmDeleteModalShown = true;
  }

  deleteArticle() {
    this.closeAllModals();
    this.loadingService.enableLoading();

    if (this.articleToDelete) {
      this.articleRepository.delete(this.articleToDelete.id).subscribe(
        success => {
          this.loadingService.disableLoading();
          this.successModalShown = true;
          this.newArticleForm.reset();
          this.updateData()
        },
        fail => {
          this.loadingService.disableLoading();
          this.failModalShown = true;
        });
    }
    else
    {
      this.loadingService.disableLoading();
      this.failModalShown = true;
    }
  }

  closeAllModals() {
    this.renderer.removeClass(document.body, 'disable-scroll');
    this.newArticleModalShown = false;
    this.successModalShown = false;
    this.failModalShown = false;
    this.editArticleModalShown = false;
    this.confirmDeleteModalShown = false;
  }

  updateData() {
    this.loadingService.enableLoading();
    this.articleRepository.getAll().subscribe((articles) => {
      this.articles = articles;
      this.loadingService.disableLoading();
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
