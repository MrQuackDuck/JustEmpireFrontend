import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Language } from '../enum/Language';
import { Article } from '../model/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<Article[]> {
    return this.httpClient.get<Article[]>('http://localhost:5228/API/Article/GetAllStaff', { withCredentials: true })
  }

  getCount() : Observable<number> {
    return this.httpClient.get<number>('http://localhost:5228/API/Article/GetCount', { withCredentials: true })
  }

  getById(id : number) : Observable<Article> {
    return this.httpClient.get<Article>('http://localhost:5228/API/Article/GetById', { params: { "id": id } })
  }

  getRecent(language : Language, count : number) : Observable<Article[]> {
    return this.httpClient.get<Article[]>('http://localhost:5228/API/Article/GetRecent', {
      params: {
        "count": count,
        "language": language
      }
    })
  }

  // Get a page with articles (used to realize pagination)
  getPage(language : Language, pageIndex : number, itemsOnPage : number) : Observable<Article[]> {
    return this.httpClient.get<Article[]>('http://localhost:5228/API/Article/GetPage', { 
      params: {
        "language": language,
        "pageIndex": pageIndex,
        "itemsOnPage": itemsOnPage }
    })
  }

  // Get total pages count (used to realize pagination)
  getPagesCount(language : Language, itemsOnPage : number) : Observable<number> {
    return this.httpClient.get<number>('http://localhost:5228/API/Article/GetPagesCount', { 
      params: {
        "language": language,
        "itemsOnPage": itemsOnPage 
      }
    })
  }
}
