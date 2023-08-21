import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { ArticlesComponent } from './articles/articles.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticleCardComponent } from './article-card/article-card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ArticlePaginationComponent } from './article-pagination/article-pagination.component';
import { LoadingComponent } from './loading/loading.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { VersionReaderComponent } from './version-reader/version-reader.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from './admin-panel/admin-panel.guard';
import { AdminPanelStatsComponent } from './admin-panel-stats/admin-panel-stats.component';
import { LoadingService } from './services/loading.service';
import { AdminPanelTabComponent } from './admin-panel-tab/admin-panel-tab.component';
import { AdminPanelManageArticlesComponent } from './admin-panel-manage-articles/admin-panel-manage-articles.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LangCodePipe } from './pipes/lang-code.pipe';
import { StatusCodePipe } from './pipes/status-code.pipe';
import { AuthorPipe } from './pipes/author.pipe';
import { ModalComponent } from './modal/modal.component';
import { QuillModule } from 'ngx-quill';
import { Safe } from './pipes/safe.pipe';
import { ButtonComponent } from './button/button.component';
import { provideTippyConfig, tooltipVariation, popperVariation, TippyDirective } from '@ngneat/helipopper';
import { StatusDescriptionPipe } from './pipes/status-description.pipe';
import { OriginalIdTooltip } from './pipes/original-id-tooltip.pipe';
import { AdminPanelManageServicesComponent } from './admin-panel-manage-services/admin-panel-manage-services.component';
import { ServicePageContentComponent } from './service-page-content/service-page-content.component';
import { ServiceCategoryPipe } from './pipes/service-category.pipe';
import { AdminPanelManageServiceCategoriesComponent } from './admin-panel-manage-service-categories/admin-panel-manage-service-categories.component';
import { AdminPanelManageServiceVersionsComponent } from './admin-panel-manage-service-versions/admin-panel-manage-service-versions.component';
import { ServiceNamePipe } from './pipes/service-name.pipe';
import { AdminPanelManageServiceImagesComponent } from './admin-panel-manage-service-images/admin-panel-manage-service-images.component';
import { AdminPanelManageUsersComponent } from './admin-panel-manage-users/admin-panel-manage-users.component';
import { RankPipe } from './pipes/rank.pipe';
import { AdminPanelManageApprovementsComponent } from './admin-panel-manage-approvements/admin-panel-manage-approvements.component';
import { PostableTypePipe } from './pipes/postableType.pipe';
import { PostableTypeShortPipe } from './pipes/postableTypeShort.pipe';
import { LangFullPipe } from './pipes/lang-full.pipe';
import { TranslatePipe } from './pipes/translate.pipe';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { RemoveHtmlTagsPipe } from './pipes/removeHtmlTags.pipe';
import { PolicyComponent } from './policy/policy.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    ArticlesComponent,
    ArticleCardComponent,
    NotFoundComponent,
    ArticlePageComponent,
    ArticlePaginationComponent,
    ServicesPageComponent,
    ServiceCardComponent,
    ServicePageComponent,
    ImageViewerComponent,
    VersionReaderComponent,
    LoginComponent,
    Safe,
    ModalComponent,
    ButtonComponent,
    TruncatePipe,
    LangCodePipe,
    StatusCodePipe,
    StatusDescriptionPipe,
    ServiceNamePipe,
    OriginalIdTooltip,
    AuthorPipe,
    ServiceCategoryPipe,
    RankPipe,
    PostableTypePipe,
    PostableTypeShortPipe,
    LangFullPipe,
    TranslatePipe,
    RemoveHtmlTagsPipe,
    ServicePageContentComponent,
    AdminPanelComponent,
    AdminPanelStatsComponent,
    AdminPanelTabComponent,
    AdminPanelManageArticlesComponent,
    AdminPanelManageServicesComponent,
    AdminPanelManageServiceCategoriesComponent,
    AdminPanelManageServiceVersionsComponent,
    AdminPanelManageServiceImagesComponent,
    AdminPanelManageUsersComponent,
    AdminPanelManageApprovementsComponent,
    PolicyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    TippyDirective,
    NotifierModule
  ],
  providers: [
    LoadingService,
    AdminGuard,
    TippyDirective,
    provideTippyConfig({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
