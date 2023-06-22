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

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  constructor(
  private authService : AuthService, 
  private loadingService : LoadingService, 
  private articleRepository : ArticleRepositoryService, 
  private serviceRepository : ServiceRepositoryService,
  private serviceCategoryRepository : ServiceCategoryRepositoryService,
  private serviceVersionRepository : ServiceVersionRepositoryService,
  private userRepository : UserRepositoryService,
  private imageLoader : ImageLoaderService,
  public selectedTabService : AdminSelectedTabService) {}

  articlesCount : number;
  servicesCount : number;
  serviceCategoriesCount : number;
  serviceVersionsCount : number;
  userCount : number;

  currentUser : User;

  ngOnInit() {

    this.loadingService.disableLoading();
    this.loadingService.disableLoading();
    this.authService.getUser().subscribe(user => {
      this.currentUser = user
      console.log(user);
    })

    this.articleRepository.getCount().subscribe(count => this.articlesCount = count);
    this.serviceRepository.getCount().subscribe(count => this.servicesCount = count);
    this.serviceVersionRepository.getCount().subscribe(count => this.serviceVersionsCount = count)
    this.serviceCategoryRepository.getCount().subscribe(count => this.serviceCategoriesCount = count);
    this.userRepository.getCount().subscribe(count => this.userCount = count);
  }

  setTab(tabIndex : number) {
    this.imageLoader.loadImages();
    this.selectedTabService.selectedTab = tabIndex;
  }
}