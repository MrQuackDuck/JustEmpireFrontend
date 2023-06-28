import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Language } from '../enum/Language';
import { Article } from '../model/article';
import { Observable } from 'rxjs';
import { CreateArticleModel } from '../model/createArticleModel';
import { EditArticleModel } from '../model/editArticleModel';

@Injectable({
  providedIn: 'root'
})
export class ArticleRepositoryService {
  constructor(private httpClient : HttpClient) { }

  create(articleModel: CreateArticleModel): Observable<Article> {
    let title = articleModel.title;
    let text = articleModel.text;
    let titleImage = articleModel.titleImage;
    let language = articleModel.language;

    return this.httpClient.post<any>("http://localhost:5228/API/Article/Create", 
    { title, text, titleImage, language },
    { withCredentials: true });
  }

  edit(articleModel: EditArticleModel): Observable<boolean> {
    let id = articleModel.id
    let title = articleModel.title;
    let text = articleModel.text;
    let titleImage = articleModel.titleImage;
    let language = articleModel.language;

    return this.httpClient.put<boolean>("http://localhost:5228/API/Article/Edit", 
    { id, title, text, titleImage, language },
    { withCredentials: true });
  }

  delete(id : number) : Observable<boolean> {
    return this.httpClient.get<any>('http://localhost:5228/API/Article/Delete', { 
      params: { 
        "id": id
      }, withCredentials: true
    })
  }
  
  getAll() : Observable<Article[]> {
    return this.httpClient.get<Article[]>('http://localhost:5228/API/Article/GetAllStaff', { withCredentials: true })
  }

  getCount() : Observable<number> {
    return this.httpClient.get<number>('http://localhost:5228/API/Article/GetCount', { withCredentials: true })
  }

  getById(id : number) : Observable<Article> {
    return this.httpClient.get<Article>('http://localhost:5228/API/Article/GetById', { 
      params: { 
        "id": id
      } 
    })
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
