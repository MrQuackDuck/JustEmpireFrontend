import { Component, Renderer2 } from '@angular/core';
import { ApprovementsService } from '../services/approvements.service';
import { Postable } from '../model/postable';
import { LoadingService } from '../services/loading.service';
import { AdminSelectedTabService } from '../services/admin-selected-tab.service';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { Rank } from '../model/rank';
import { Router } from '@angular/router';
import { PostableType } from '../enum/PostableType';
import { Article } from '../model/article';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { ServiceRepositoryService } from '../services/service-repository.service';
import { ServiceVersionRepositoryService } from '../services/service-version-repository.service';
import { ServiceCategoryRepositoryService } from '../services/service-category-repository.service';
import { ServiceImageRepositoryService } from '../services/service-image-repository.service';
import { API_URL } from 'src/globals';
import { Service } from '../model/service';
import { ServiceVersion } from '../model/serviceVersion';
import { ServiceCategory } from '../model/serviceCategory';
import { ServiceImage } from '../model/serviceImage';
import { Status } from '../enum/Status';
import { Observable } from 'rxjs';
import { TitleService } from '../services/title-service.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-admin-panel-manage-approvements',
  templateUrl: './admin-panel-manage-approvements.component.html',
  styleUrls: ['./admin-panel-manage-approvements.component.css']
})
export class AdminPanelManageApprovementsComponent {
  constructor(private approvementsRepository : ApprovementsService, 
    private loadingService : LoadingService, private renderer : Renderer2, 
    private adminSelectedTab : AdminSelectedTabService, private authService : AuthService,
    private router : Router, 
    private articleRepository : ArticleRepositoryService,
    private serviceRepository : ServiceRepositoryService, 
    private serviceVersionRepository : ServiceVersionRepositoryService,
    private serviceCategoryRepository : ServiceCategoryRepositoryService,
    private serviceImageRepository : ServiceImageRepositoryService,
    private titleService : TitleService,
    private translateService : TranslateService) { }

  API_URL = API_URL

  approvements : Postable[] = [];

  successModalShown : boolean;
  successMessage : string = "";

  failModalShown : boolean;

  currentUser? : User;
  currentRank? : Rank;

  ngOnInit() {
    this.titleService.setTitle(this.translateService.translate('MANAGE_APPROVEMENTS'));
    this.updateData()

    this.adminSelectedTab.selectedTab = 3;

    this.authService.getCurrentRank().subscribe(rank => {
      this.currentRank = rank
      if (!this.currentRank.manageApprovements) {
        this.router.navigate(["/admin"]);
        this.adminSelectedTab.selectedTab = 0;
        return;
      }
    })
    
    this.authService.getUser().subscribe(user => {
      this.currentUser = user
    })
  }

  closeAllModals() {
    this.renderer.removeClass(document.body, 'disable-scroll');
    this.successModalShown = false;
    this.failModalShown = false;
    this.viewArticleModalShown = false;
    this.viewServiceModalShown = false;
    this.viewServiceVersioModalShown = false;
    this.viewServiceCategoryModalShown = false;
    this.viewImageModalShown = false;
    this.confirmApproveModalShown = false;
    this.confirmDeclineModalShown = false;
  }

  updateData() { 
    this.loadingService.enableLoading();
    this.approvementsRepository.getAll().subscribe((approvements) => {
      this.approvements = approvements.sort();
      this.loadingService.disableLoading();
    });
  }

  viewPostable(target : Postable) {
    switch (target.type) {
      case PostableType.ARTICLE:
        this.viewArticle(target.id);
        break;
      case PostableType.SERVICE:
        this.viewService(target.id);
        break;
      case PostableType.VERSION:
        this.viewServiceVersion(target.id);
        break;
      case PostableType.CATEGORY:
        this.viewServiceCategory(target.id);
        break;
      case PostableType.IMAGE:
        this.viewServiceImage(target.id);
        break;
    }
  }

  viewOriginalPostable(target : Postable) {
    switch (target.type) {
      case PostableType.ARTICLE:
        this.viewArticle(target.originalId);
        break;
      case PostableType.SERVICE:
        this.viewService(target.originalId);
        break;
      case PostableType.VERSION:
        this.viewServiceVersion(target.originalId!);
        break;
      case PostableType.CATEGORY:
        this.viewServiceCategory(target.originalId!);
        break;
      case PostableType.IMAGE:
        this.viewServiceImage(target.originalId!);
        break;
    }
  }

  currentViewedArticle? : Article;
  viewArticleModalShown : boolean;

  viewArticle(id) {
    this.articleRepository.getByIdStaff(id).subscribe(article => {
      this.currentViewedArticle = article;
      this.viewArticleModalShown = true;
    });
  }

  currentViewedService? : Service;
  viewServiceModalShown : boolean;

  viewService(id) {
    this.serviceRepository.getByIdStaff(id).subscribe(service => {
      this.currentViewedService = service;
      this.viewServiceModalShown = true;
    })
  }

  currentViewedVersion? : ServiceVersion;
  viewServiceVersioModalShown : boolean;

  viewServiceVersion(id : number) {
    this.serviceVersionRepository.getByIdStaff(id).subscribe(version => {
      this.currentViewedVersion = version;
      this.viewServiceVersioModalShown = true;
    })
  }

  currentViewedCategory? : ServiceCategory;
  viewServiceCategoryModalShown : boolean;

  viewServiceCategory(id : number) {
    this.serviceCategoryRepository.getByIdStaff(id).subscribe(category => {
      this.currentViewedCategory = category;
      this.viewServiceCategoryModalShown = true;
    })
  }

  currentViewedImage? : ServiceImage;
  viewImageModalShown : boolean;

  viewServiceImage(id : number) {
    this.serviceImageRepository.getByIdStaff(id).subscribe(image => {
      this.currentViewedImage = image;
      this.viewImageModalShown = true;
    })
  }

  postableToBeApproved? : Postable;
  postableToBeDeclined? : Postable;

  confirmApproveModalShown : boolean;
  confirmDeclineModalShown : boolean;

  showModalToApprove(target : Postable) {
    this.postableToBeApproved = target;
    this.confirmApproveModalShown = true;
  }

  showModalToDecline(target : Postable) {
    this.postableToBeDeclined = target;
    this.confirmDeclineModalShown = true;
  }

  approvePostable(target : Postable) {
    this.loadingService.enableLoading();
    this.generateApprovePostableRequest(target)!.subscribe(success => {
      this.updateData();
      this.successModalShown = true;
      this.loadingService.disableLoading();
    }, 
    fail => {
      this.failModalShown = true;
      this.loadingService.disableLoading();
    });
  }

  declinePostable(target : Postable) {
    this.loadingService.enableLoading();
    this.generateDeclinePostableRequest(target)!.subscribe(success => {
      this.updateData();
      this.successModalShown = true;
      this.loadingService.disableLoading();
    }, 
    fail => {
      this.failModalShown = true;
      this.loadingService.disableLoading();
    });
  }

  generateDeclinePostableRequest(target : Postable)  : Observable<any> | undefined {
    switch (target.type) {
      case PostableType.ARTICLE:
        return this.articleRepository.declineRequest(target.id);
      case PostableType.SERVICE:
        return this.serviceRepository.declineRequest(target.id);
      case PostableType.VERSION:
        return this.serviceVersionRepository.declineRequest(target.id);
      case PostableType.CATEGORY:
        return this.serviceCategoryRepository.declineRequest(target.id);
      case PostableType.IMAGE:
        return this.serviceImageRepository.declineRequest(target.id);
    }
  }

  generateApprovePostableRequest(target : Postable) : Observable<any> | undefined {
    switch (target.type) {
      case PostableType.ARTICLE:
        if (target.status == Status.QUEUE_CREATE) return this.articleRepository.approveCreate(target.id);
        else if (target.status == Status.QUEUE_UPDATE) return this.articleRepository.approveEdit(target.id);
        else if (target.status == Status.QUEUE_DELETE) return this.articleRepository.approveDelete(target.id);
        break;
      case PostableType.SERVICE:
        if (target.status == Status.QUEUE_CREATE) return this.serviceRepository.approveCreate(target.id);
        else if (target.status == Status.QUEUE_UPDATE) return this.serviceRepository.approveEdit(target.id);
        else if (target.status == Status.QUEUE_DELETE) return this.serviceRepository.approveDelete(target.id);
        break;
      case PostableType.VERSION:
        if (target.status == Status.QUEUE_CREATE) return this.serviceVersionRepository.approveCreate(target.id);
        else if (target.status == Status.QUEUE_UPDATE) return this.serviceVersionRepository.approveEdit(target.id);
        else if (target.status == Status.QUEUE_DELETE) return this.serviceVersionRepository.approveDelete(target.id);
        break;
      case PostableType.CATEGORY:
        if (target.status == Status.QUEUE_CREATE) return this.serviceCategoryRepository.approveCreate(target.id);
        else if (target.status == Status.QUEUE_UPDATE) return this.serviceCategoryRepository.approveEdit(target.id);
        else if (target.status == Status.QUEUE_DELETE) return this.serviceCategoryRepository.approveDelete(target.id);
        break;
      case PostableType.IMAGE:
        if (target.status == Status.QUEUE_CREATE) return this.serviceImageRepository.approveCreate(target.id);
        else if (target.status == Status.QUEUE_UPDATE) return this.serviceImageRepository.approveEdit(target.id);
        else if (target.status == Status.QUEUE_DELETE) return this.serviceImageRepository.approveDelete(target.id);
        break;
    }
    return undefined;
  }
}
