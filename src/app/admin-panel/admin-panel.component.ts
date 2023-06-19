import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { LoadingService } from '../services/loading.service';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { ServiceRepositoryService } from '../services/service-repository.service';
import { ServiceCategoryRepositoryService } from '../services/service-category-repository.service';
import { ServiceVersionRepositoryService } from '../services/service-version-repository.service';

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
  private serviceVersionRepository : ServiceVersionRepositoryService) {}

  selectedTab : number = 1;

  articlesCount : number;
  servicesCount : number;
  serviceCategoriesCount : number;

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
    this.serviceCategoryRepository.getCount().subscribe(count => this.serviceCategoriesCount = count);
  }

  
}