import { Component, OnInit } from '@angular/core';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { Language } from '../enum/Language';
import { Observable } from 'rxjs';
import { Article } from '../model/article';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  constructor(private route : ActivatedRoute, private router: Router, private articleRepository : ArticleRepositoryService,
    private loadingService : LoadingService) {}

  articles$ : Observable<Article[]>;
  itemsOnPage : number = 5; // How many articles will be displayed per page
  currentPage : number;
  language : Language = Language.EN;

  readonly pageName = 'news';
  
  ngOnInit() {
    let language : Language = this.route.snapshot.params['language'];
    let pageIndex : number = +this.route.snapshot.params['pageIndex'];
    
    // If 'Language' enum not includes provided value, then redirect user to default language page
    if (!Object.values(Language).includes(language)) {
      this.language = Language.EN;
      this.router.navigate([this.pageName, 'EN']); // TODO: Get actual site language
    }
    else {
      this.language = language
    }

    let totalPageCount : number;
    
    this.articleRepository.getPagesCount(this.language, this.itemsOnPage).subscribe(pageCount => {
      totalPageCount = pageCount;
      if (pageIndex < 0 || pageIndex > pageCount) {
        this.currentPage = 1;
        this.router.navigate([this.pageName, 'EN', 1], { replaceUrl: true });
        return;
      } 
      else {
        this.currentPage = pageIndex;
      }
    })

    this.route.paramMap.subscribe((params: ParamMap) =>
    {
      let index : number = Number(params.get('pageIndex'))
      if (index < 0 || index > totalPageCount) {
        this.currentPage = 1;
        this.router.navigate([this.pageName, 'EN', 1], { replaceUrl: true });
        return;
      } 
      else {
        this.currentPage = index;
      }
      this.updateData();
    });  
  }

  async updateData() {
    this.loadingService.enableLoading()
    await this.delay(300);
    this.articles$ = this.articleRepository.getPage(this.language, this.currentPage, this.itemsOnPage);
    await this.delay(30);
    this.articles$.subscribe(() => this.loadingService.disableLoading())
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
