import { Component, OnInit } from '@angular/core';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { Language } from '../enum/Language';
import { Observable } from 'rxjs';
import { Article } from '../model/article';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { API_URL } from 'src/globals';
import { LanguageService } from '../services/language.service';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '../services/translate.service';
import { TitleService } from '../services/title-service.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  constructor(private route : ActivatedRoute, private router: Router, private articleRepository : ArticleRepositoryService,
    private loadingService : LoadingService, private languageService : LanguageService, 
    private notifierService : NotifierService, private translateService : TranslateService,
    private titleService : TitleService) {}

  articles : Article[];
  itemsOnPage : number = 5; // How many articles will be displayed per page
  currentPage : number;
  language : Language = Language.EN;
  totalPageCount : number;

  readonly pageName = 'news';

  ngOnInit() {
    this.titleService.setTitle(this.translateService.translate('NEWS'));

    this.loadingService.enableLoading();

    let language : Language = this.route.snapshot.params['language']?.toUpperCase();
    let pageIndex : number = +this.route.snapshot.params['pageIndex'];

    if (Number.isNaN(pageIndex)) pageIndex = 1;
    
    // If 'Language' enum not includes provided value, then redirect user to default language page
    if (!Object.values(Language).includes(language)) {
      this.language = this.languageService.getLanguage();
      this.router.navigate([this.languageService.getLanguageCode().toLowerCase(), this.pageName]);
      return;
    }
    else {
      this.language = language
    }

    this.route.paramMap.subscribe((params: ParamMap) =>
    {
      let index : number = Number(params.get('pageIndex'))
      if (index < 0 || index > this.totalPageCount) {
        this.currentPage = 1;
        this.router.navigate([this.pageName, 'EN', 1], { replaceUrl: true });
        return;
      } 
      else 
      {
        let oldPage = this.currentPage;
        this.currentPage = index;
        if (!this.articles || oldPage != index) {
          this.updateData();
        }
      }
    });  
  }

  async updateData() {
    this.loadingService.enableLoading()
    await this.delay(300);
    this.articleRepository.getPage(this.language, this.currentPage, this.itemsOnPage).subscribe(articles => {
      this.articles = articles;
      this.loadingService.disableLoading()
    }, error => {
      if (error.status == 503) this.notifierService.notify('error', this.translateService.translate('TOO_MANY_REQUESTS'));
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
