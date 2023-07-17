import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { Observable, delay } from 'rxjs';
import { Article } from '../model/article';
import { Language } from '../enum/Language';
import slugify from 'slugify';
import { LoadingService } from '../services/loading.service';
import { API_URL } from 'src/globals';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent {
  constructor(private route : ActivatedRoute, private router: Router, private articleRepository : ArticleRepositoryService,
    private loadingService : LoadingService, private language : LanguageService) {}

  API_URL = API_URL;

  id;
  article : Article;
  recentArticles$ : Observable<Article[]>;

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.recentArticles$ = this.articleRepository.getRecent(this.language.getLanguage(), 3);

    this.route.paramMap.subscribe((params: ParamMap)=>
    {
        this.id = params.get('id');
        this.updateData();
    });  
  }

  async updateData() {
    this.loadingService.enableLoading()
    this.articleRepository.getById(this.id)
      .subscribe(async data => {
        this.article = data;
        delay(300);
        this.loadingService.disableLoading();
      }, error => this.router.navigate(['/404']));
  }

  getSlugifiedTitle(title : string) {
    return slugify(title, '-').toLowerCase();
  }

  getLanguageCode(language : Language) {
    return Language[language];
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
