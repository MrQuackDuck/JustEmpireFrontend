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
    AdminPanelComponent,
    AdminPanelStatsComponent,
    AdminPanelTabComponent,
    AdminPanelManageArticlesComponent,
    TruncatePipe,
    LangCodePipe,
    StatusCodePipe,
    AuthorPipe,
    Safe,
    ModalComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule
  ],
  providers: [
    LoadingService,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
