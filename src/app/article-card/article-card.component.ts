import { Component, Input } from '@angular/core';
import { Article } from '../model/article';
import { Language } from '../enum/Language';
import slugify from 'slugify';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent {
  constructor() { }

  @Input()
  article : Article;
  languageCode : string;

  slugifiedTitle : string;

  ngOnInit() {
    this.languageCode = Language[this.article.language];
    this.slugifiedTitle = slugify(this.article.title, '-').toLowerCase();
  }
}
