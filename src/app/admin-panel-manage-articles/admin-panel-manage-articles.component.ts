import { Component, ElementRef, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { Article } from '../model/article';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../services/loading.service';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { Rank } from '../model/rank';
import { Status } from '../enum/Status';
import { ImageUploaderService } from '../services/image-uploader.service';
import { API_URL, LANGUAGES } from 'src/globals';
import { QuillModules, defaultModules } from 'ngx-quill';
import { imageHandler } from '../quill/handlers/imageHandler';
import { AdminSelectedTabService } from '../services/admin-selected-tab.service';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '../services/translate.service';
import { TitleService } from '../services/title-service.service';

@Component({
  selector: 'app-admin-panel-manage-articles',
  templateUrl: './admin-panel-manage-articles.component.html',
  styleUrls: ['./admin-panel-manage-articles.component.css'],
})
export class AdminPanelManageArticlesComponent {
  constructor(private articleRepository : ArticleRepositoryService, private formBuilder : FormBuilder, 
  private loadingService : LoadingService, private renderer: Renderer2, private authService : AuthService,
  private imageUploader : ImageUploaderService, private adminSelectedTab : AdminSelectedTabService,
  private translateService : TranslateService, private titleService : TitleService) {}

  quillModules: QuillModules = {
    toolbar: {
      container: defaultModules.toolbar, 
      handlers: {
        image: imageHandler
      }
    },
  };

  currentUser : User;

  articles : Article[];

  API_URL = API_URL;

  viewArticleModalShown : boolean;
  currentViewedArticle? : Article;

  newArticleModalShown : boolean;
  newArticleForm : FormGroup;

  successMessage : string = "";
  successModalShown : boolean;

  failModalShown : boolean;

  currentArticleEdited? : Article;
  editArticleForm : FormGroup;
  editArticleModalShown : boolean;

  confirmDeleteModalShown : boolean;
  articleToDelete? : Article;

  currentRank : Rank;

  languages = LANGUAGES;

  ngOnInit() {
    this.titleService.setTitle(this.translateService.translate('MANAGE_ARTICLES'));
    this.updateData()

    this.adminSelectedTab.selectedTab = 1;

    this.authService.getCurrentRank().subscribe(rank => {
      this.currentRank = rank
      console.log(rank);
    })
    
    this.authService.getUser().subscribe(user => {
      this.currentUser = user
      console.log(user);
    })

    // Setting up input forms
    this.newArticleForm = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      titleImage: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      tags: new FormControl(null),
      language : new FormControl(0, Validators.required)
    });

    this.editArticleForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      titleImage: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      tags: new FormControl(null),
      language : new FormControl(0, Validators.required)
    });
  }

  uploadFile(event: Event, targetForm : FormGroup, browseLabel : HTMLLabelElement) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let file : File = fileList[0];
      this.imageUploader.uploadImage(file).subscribe(file => {
        let filename = file.filename;
        browseLabel.innerHTML = `<img src='${API_URL}/uploads/${filename}'>`;
        try 
        {
          targetForm.controls['titleImage'].setValue(filename);
        } 
        catch { }
      });
    }
  }

  viewArticle(article : Article) {
    this.currentViewedArticle = article;
    this.viewArticleModalShown = true;
  }

  submitNewArticle(browseLabel : HTMLLabelElement) {
    if (!this.newArticleForm.valid) {
      return; 
    }

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.articleRepository.create(this.newArticleForm.getRawValue()).subscribe(
      success => {
        this.loadingService.disableLoading();
        this.successModalShown = true;
        this.updateData();
        browseLabel.innerHTML = `<span>${this.translateService.translate('BROWSE')}</span>`;
        this.newArticleForm.reset();
        this.newArticleForm.markAsPristine();
        this.newArticleForm.markAsUntouched();
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
      this.editArticleForm.controls['tags'].setValue(targetArticle.tags);
      this.editArticleForm.controls['language'].setValue(targetArticle.language);
      this.editArticleForm.controls['titleImage'].setValue(targetArticle.titleImage);
      
      let label : any = document.querySelector('.upload-photo-label-edit')
      label.innerHTML = `<img src='${API_URL}/uploads/${targetArticle.titleImage}'>`;
    }
  }

  submitEditedArticle() {
    if (!this.editArticleForm.valid) {
      return; 
    }

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.articleRepository.edit(this.editArticleForm.getRawValue()).subscribe(
      success => {
        this.loadingService.disableLoading();
        this.successModalShown = true;
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
          this.successMessage = this.getSuccessDeleteMessage();
          this.successModalShown = true;
          this.successMessage = this.getSuccessDeleteMessage();
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
    this.viewArticleModalShown = false;
    this.newArticleModalShown = false;
    this.editArticleModalShown = false;
    this.confirmDeleteModalShown = false;
    this.successModalShown = false;
    this.failModalShown = false;
  }

  getSuccessDeleteMessage() : string {
    if (this.currentRank.approvementToDeletePostableOthers) 
    {
      return this.translateService.translate('ARTICLE_PENDING_TO_BE_DELETED');
    }
    else 
    {
      return this.translateService.translate('SUCCESSFULLY_DELETED_ARTICLE');
    }
  }

  updateData() {
    this.loadingService.enableLoading();
    this.articleRepository.getAll().subscribe((articles) => {
      this.articles = articles;
      this.loadingService.disableLoading();
    });
  }

  canEdit(article : Article) : [boolean, string] {
    if (article.status != Status.POSTED) {
      return [false, this.translateService.translate('CANT_EDIT_PENDING_POSTABLE', this.translateService.translate('ARTICLE'))];
    }

    // If user is author of the article and he has permission to delete own postable
    if (article.authorId == this.currentUser.id && this.currentRank.editPostableOwn)
    {
      return [true, ""];
    }
    // If user is not author of the article and he has permission to delete others postable
    else if (article.authorId != this.currentUser.id && this.currentRank.editPostableOthers)
    {
      return [true, ""];
    }

    return [false, this.translateService.translate('DONT_HAVE_ENOUGH_PERMISSIONS')];
  }

  canDelete(article : Article) : [boolean, string] {
    if (article.status != Status.POSTED) {
      return [false, this.translateService.translate('CANT_DELETE_UNPUBLISHED_POSTABLE', this.translateService.translate('ARTICLE'))];
    }
    
    let target = this.articles.find(a => a.originalId == article.id)
    if (target) {
      return [false, this.translateService.translate('POSTABLE_PENDING_FOR_ACTION', this.translateService.translate('ARTICLE'), target.id)];
    }

    // If user is author of the article and he has permission to delete own postable
    if (article.authorId == this.currentUser.id && this.currentRank.deletePostableOwn)
    {
      return [true, ""];
    }
    // If user is not author of the article and he has permission to delete others postable
    else if (article.authorId != this.currentUser.id && this.currentRank.deletePostableOthers)
    {
      return [true, ""];
    }

    return [false, this.translateService.translate('DONT_HAVE_ENOUGH_PERMISSIONS')];
  }
}