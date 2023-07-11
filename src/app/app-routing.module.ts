import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ArticlesComponent } from './articles/articles.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from './admin-panel/admin-panel.guard';
import { AdminPanelStatsComponent } from './admin-panel-stats/admin-panel-stats.component';
import { AdminPanelManageArticlesComponent } from './admin-panel-manage-articles/admin-panel-manage-articles.component';
import { AdminPanelManageServicesComponent } from './admin-panel-manage-services/admin-panel-manage-services.component';
import { AdminPanelManageServiceCategoriesComponent } from './admin-panel-manage-service-categories/admin-panel-manage-service-categories.component';
import { AdminPanelManageServiceVersionsComponent } from './admin-panel-manage-service-versions/admin-panel-manage-service-versions.component';
import { AdminPanelManageServiceImagesComponent } from './admin-panel-manage-service-images/admin-panel-manage-service-images.component';
import { AdminPanelManageUsersComponent } from './admin-panel-manage-users/admin-panel-manage-users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
    pathMatch: 'full'
  },
  {
    path: "home",
    title: "JustEmpire | Home",
    component: IndexComponent
  },
  {
    path: "articles",
    title: "JustEmpire | Articles",
    component: ArticlesComponent,
  },
  {
    path: "news",
    title: "JustEmpire | Articles",
    pathMatch: 'prefix',
    component: ArticlesComponent,
  },
  {
    path: "news/:language",
    pathMatch: "full",
    title: "JustEmpire | Articles",
    component: ArticlesComponent,
  },
  {
    path: "news/:language/:pageIndex",
    pathMatch: "full",
    title: "JustEmpire | Articles",
    component: ArticlesComponent,
  },
  {
    path: "article/:language/:id",
    pathMatch: "prefix",
    title: "JustEmpire | Article",
    component: ArticlePageComponent,
  },
  {
    path: "article/:language/:id/:str",
    pathMatch: "prefix",
    title: "JustEmpire | Article",
    component: ArticlePageComponent,
  },
  // Services Page
  {
    path: "services",
    pathMatch: "full",
    title: "JustEmpire | Services",
    component: ServicesPageComponent,
  },
  {
    path: "services/:language",
    pathMatch: "full",
    title: "JustEmpire | Services",
    component: ServicesPageComponent,
  },
  {
    path: "services/:language/:pageIndex",
    pathMatch: "full",
    title: "JustEmpire | Services",
    component: ServicesPageComponent,
  },
  // Service Page
  {
    path: "service/:language/:id",
    pathMatch: "prefix",
    title: "JustEmpire | Service",
    component: ServicePageComponent,
    data: { "type": 'versions' }
  },
  {
    path: "service/:language/:id/:str",
    pathMatch: "prefix",
    title: "JustEmpire | Service",
    component: ServicePageComponent,
  },
  // Login
  {
    path: "login",
    pathMatch: "prefix",
    title: "JustEmpire | Login",
    component: LoginComponent,
  },
  // Admin
  {
    path: "admin",
    pathMatch: "prefix",
    title: "JustEmpire | Admin",
    component: AdminPanelComponent,
    canActivate: [AdminGuard],
  },
  {
    path: "admin/stats",
    pathMatch: "prefix",
    title: "JustEmpire | Stats",
    component: AdminPanelStatsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "admin/manageArticles",
    pathMatch: "prefix",
    title: "JustEmpire | Manage articles",
    component: AdminPanelManageArticlesComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "admin/manageServices",
    pathMatch: "prefix",
    title: "JustEmpire | Manage services",
    component: AdminPanelManageServicesComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "admin/manageServiceCategories",
    pathMatch: "prefix",
    title: "JustEmpire | Manage service categories",
    component: AdminPanelManageServiceCategoriesComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "admin/manageServiceVersions",
    pathMatch: "prefix",
    title: "JustEmpire | Manage service versions",
    component: AdminPanelManageServiceVersionsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "admin/manageServiceImages",
    pathMatch: "prefix",
    title: "JustEmpire | Manage service images",
    component: AdminPanelManageServiceImagesComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "admin/manageUsers",
    pathMatch: "prefix",
    title: "JustEmpire | Manage users",
    component: AdminPanelManageUsersComponent,
    canActivate: [AdminGuard]
  },
  // Not found page
  {
    path: "**",
    title: "JustEmpire | Not Found",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
