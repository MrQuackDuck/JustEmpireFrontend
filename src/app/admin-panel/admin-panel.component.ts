import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { LoadingService } from '../services/loading.service';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { ServiceRepositoryService } from '../services/service-repository.service';
import { ServiceCategoryRepositoryService } from '../services/service-category-repository.service';
import { ServiceVersionRepositoryService } from '../services/service-version-repository.service';
import { AdminSelectedTabService } from '../services/admin-selected-tab.service';
import { UserRepositoryService } from '../services/user-repository.service';
import { ImageLoaderService } from '../services/image-loader.service';
import { Rank } from '../model/rank';
import { Router } from '@angular/router';
import { ServiceImageRepositoryService } from '../services/service-image-repository.service';
import { ApprovementsService } from '../services/approvements.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TitleService } from '../services/title-service.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  constructor(
  private authService : AuthService,
  private articleRepository : ArticleRepositoryService, 
  private serviceRepository : ServiceRepositoryService,
  private serviceCategoryRepository : ServiceCategoryRepositoryService,
  private serviceVersionRepository : ServiceVersionRepositoryService,
  private serviceImageRepository : ServiceImageRepositoryService,
  private userRepository : UserRepositoryService,
  private approvementRepository : ApprovementsService,
  private imageLoader : ImageLoaderService,
  private router : Router,
  public selectedTabService : AdminSelectedTabService,
  private formBuilder : FormBuilder,
  private loadingService : LoadingService,
  private titleService : TitleService,
  private translateService : TranslateService) {}

  articlesCount : number;
  servicesCount : number;
  serviceCategoriesCount : number;
  serviceVersionsCount : number;
  serviceImagesCount : number;
  userCount : number;
  approvementsCount : number;

  passwordsDontMatch : boolean;
  changePasswordModalShown : boolean;
  changePasswordForm : FormGroup;

  currentUser : User;
  currentRank : Rank;

  successModalShown : boolean;
  successMessage : string = "";

  failModalShown : boolean;

  ngOnInit() {
    this.titleService.setTitle(this.translateService.translate('ADMIN_PANEL'));
    this.imageLoader.loadImages();

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      newPasswordConfirm: new FormControl(null, Validators.required),
    })

    this.authService.getUser().subscribe(user => {
      this.currentUser = user
      console.log(user);
    })

    this.authService.getCurrentRank().subscribe(rank => {
      this.currentRank = rank

      if (this.currentRank.name == "Emperor") {
        this.userRepository.getCount().subscribe(count => this.userCount = count);
        this.approvementRepository.getCount().subscribe(count => this.approvementsCount = count)
      }
    })

    this.articleRepository.getCount().subscribe(count => this.articlesCount = count);
    this.serviceRepository.getCount().subscribe(count => this.servicesCount = count);
    this.serviceCategoryRepository.getCount().subscribe(count => this.serviceCategoriesCount = count);
    this.serviceVersionRepository.getCount().subscribe(count => this.serviceVersionsCount = count)
    this.serviceImageRepository.getCount().subscribe(count => this.serviceImagesCount = count);
  }

  setTab(tabIndex : number) {
    this.imageLoader.loadImages();
    this.selectedTabService.selectedTab = tabIndex;
  }

  logout() {
    this.authService.logOut().subscribe(() => {
      this.router.navigate(["/login"]);
    });
  }

  changePassword() {
    let formData : any = this.changePasswordForm.getRawValue();
    if (formData.newPassword != formData.newPasswordConfirm) 
    {
      this.passwordsDontMatch = true;
      return;
    }
    else this.passwordsDontMatch = false;

    if (!this.changePasswordForm.valid) return;

    this.loadingService.enableLoading();
    this.authService.changePassword(formData.oldPassword, formData.newPassword).subscribe(
      success => {
        this.successModalShown = true;
        this.router.navigate(['/login']);
        this.loadingService.disableLoading();
      }, 
      fail => {
        this.failModalShown = true;
        this.loadingService.disableLoading();
      }
    )
  }

  closeAllModals() {
    this.changePasswordModalShown = false;
    this.successModalShown = false;
    this.failModalShown = false;
  }
}