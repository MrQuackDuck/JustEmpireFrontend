import { Component, Renderer2 } from '@angular/core';
import { ServiceCategoryRepositoryService } from '../services/service-category-repository.service';
import { ServiceCategory } from '../model/serviceCategory';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LANGUAGES } from 'src/globals';
import { LoadingService } from '../services/loading.service';
import { Rank } from '../model/rank';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { AdminSelectedTabService } from '../services/admin-selected-tab.service';
import { Status } from '../enum/Status';
import { TranslateService } from '../services/translate.service';
import { TitleService } from '../services/title-service.service';

@Component({
  selector: 'app-admin-panel-manage-service-categories',
  templateUrl: './admin-panel-manage-service-categories.component.html',
  styleUrls: ['./admin-panel-manage-service-categories.component.css']
})
export class AdminPanelManageServiceCategoriesComponent {
  constructor(private authService : AuthService,
    private serviceCategoryRepository : ServiceCategoryRepositoryService, 
    private loadingService : LoadingService, private formBuilder : FormBuilder, 
    private adminSelectedTab: AdminSelectedTabService, private renderer: Renderer2,
    private translateService : TranslateService, private titleService : TitleService) {}

  newCategoryForm : FormGroup
  newCategoryModalShown : boolean;

  currentCategoryEdited? : ServiceCategory;
  editCategoryForm : FormGroup;
  editCategoryModalShown : boolean;

  categoryToDelete? : ServiceCategory;
  confirmDeleteModalShown : boolean;

  languages = LANGUAGES;

  serviceCategories : ServiceCategory[];

  successModalShown : boolean;
  successMessage : string = "";

  failModalShown : boolean;

  currentRank : Rank;
  currentUser : User;

  ngOnInit() {
    this.titleService.setTitle(this.translateService.translate('MANAGE_CATEGORIES'));
    this.updateData();

    this.adminSelectedTab.selectedTab = 2;

    this.authService.getCurrentRank().subscribe(rank => {
      this.currentRank = rank;
    })

    this.authService.getUser().subscribe(user => {
      this.currentUser = user;
    })

    this.newCategoryForm = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      language: new FormControl(0, Validators.required)
    });

    this.editCategoryForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      language: new FormControl(0, Validators.required)
    });
  }

  canEdit(category : ServiceCategory) : [boolean, string] {
    if (category.status != Status.POSTED) {
      return [false, this.translateService.translate("CANT_EDIT_PENDING_POSTABLE", this.translateService.translate("CATEGORY"))];
    }

    // If user is author of the category and he has permission to delete own postable
    if (category.authorId == this.currentUser.id && this.currentRank.editPostableOwn)
    {
      return [true, ""];
    }
    // If user is not author of the category and he has permission to delete others postable
    else if (category.authorId != this.currentUser.id && this.currentRank.editPostableOthers)
    {
      return [true, ""];
    }

    return [false, this.translateService.translate('DONT_HAVE_ENOUGH_PERMISSIONS')];
  }

  canDelete(category : ServiceCategory) : [boolean, string] {
    if (category.status != Status.POSTED) {
      return [false, "You can't delete unpublished category"];
    }
    
    let target = this.serviceCategories.find(a => a.originalId == category.id)
    if (target) {
      return [false, `Category ID ${target.id} is pending for action`];
    }

    // If user is author of the article and he has permission to delete own postable
    if (category.authorId == this.currentUser.id && this.currentRank.deletePostableOwn)
    {
      return [true, ""];
    }
    // If user is not author of the article and he has permission to delete others postable
    else if (category.authorId != this.currentUser.id && this.currentRank.deletePostableOthers)
    {
      return [true, ""];
    }

    return [false, "You don't have enough permissions"];
  }

  showEditModal(categoryId : number) { 
    let targetArticle = this.serviceCategories.find(article => article.id === categoryId)
    if (targetArticle) {
      this.editCategoryModalShown = true; // Show modal of article that being edited
      this.currentCategoryEdited = targetArticle;

      this.editCategoryForm.controls['id'].setValue(targetArticle.id);
      this.editCategoryForm.controls['title'].setValue(targetArticle.title);
      this.editCategoryForm.controls['language'].setValue(targetArticle.language);
    }
  }

  showDeleteModal(category : ServiceCategory) {
    this.categoryToDelete = category;
    this.confirmDeleteModalShown = true;
  }

  submitNewCategory() {
    if (!this.newCategoryForm.valid) {
      return; 
    }

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.serviceCategoryRepository.create(this.newCategoryForm.getRawValue()).subscribe(
      success => {
        this.loadingService.disableLoading();
        this.successModalShown = true;
        this.updateData();
        this.newCategoryForm.reset();
        this.newCategoryForm.markAsPristine();
        this.newCategoryForm.markAsUntouched();
      },
      fail => {
        this.loadingService.disableLoading();
        this.failModalShown = true;
      });
  }

  submitEditedCategory() {
    if (!this.editCategoryForm.valid) {
      return; 
    }

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.serviceCategoryRepository.edit(this.editCategoryForm.getRawValue()).subscribe(
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

  deleteCategory() {
    this.closeAllModals();
    this.loadingService.enableLoading();

    if (this.categoryToDelete) {
      this.serviceCategoryRepository.delete(this.categoryToDelete.id).subscribe(
        success => {
          this.loadingService.disableLoading();
          this.successMessage = this.getSuccessDeleteMessage();
          this.successModalShown = true;
          this.successMessage = this.getSuccessDeleteMessage();
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

  updateData() {
    this.loadingService.enableLoading();
    this.serviceCategoryRepository.getAllStaff().subscribe((categories) => {
      this.serviceCategories = categories;
      this.loadingService.disableLoading();
    });
  }

  closeAllModals() {
    this.renderer.removeClass(document.body, 'disable-scroll');
    this.newCategoryModalShown = false;
    this.editCategoryModalShown = false;
    this.confirmDeleteModalShown = false;
    this.failModalShown = false;
    this.successModalShown = false;
  }
  
  getSuccessDeleteMessage() : string {
    if (this.currentRank.approvementToDeletePostableOthers) 
    {
      return "Your category is now <b>pending to be deleted</b>. Emperor can approve this request or decline it";
    }
    else 
    {
      return "You have successfully deleted category!";
    }
  }
}
