import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Language } from '../enum/Language';
import { Article } from '../model/article';
import { Observable } from 'rxjs';
import { CreateArticleModel } from '../model/requestModels/createArticleModel';
import { EditArticleModel } from '../model/requestModels/editArticleModel';
import { API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class ArticleRepositoryService {
  constructor(private httpClient : HttpClient) { }

  create(articleModel: CreateArticleModel): Observable<Article> {
    let title = articleModel.title;
    let text = articleModel.text;
    let tags = articleModel.tags;
    let titleImage = articleModel.titleImage;
    let language = articleModel.language;

    return this.httpClient.post<any>(`${API_URL}/API/Article/Create`, 
    { title, text, tags, titleImage, language },
    { withCredentials: true });
  }

  edit(articleModel: EditArticleModel): Observable<boolean> {
    let id = articleModel.id
    let title = articleModel.title;
    let text = articleModel.text;
    let tags = articleModel.tags;
    let titleImage = articleModel.titleImage;
    let language = articleModel.language;

    return this.httpClient.put<boolean>(`${API_URL}/API/Article/Edit`, 
    { id, title, text, tags, titleImage, language },
    { withCredentials: true });
  }

  delete(id : number) : Observable<boolean> {
    return this.httpClient.get<any>(`${API_URL}/API/Article/Delete`, { 
      params: { 
        "id": id
      }, withCredentials: true
    })
  }
  
  getAll() : Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${API_URL}/API/Article/GetAllStaff`, { withCredentials: true })
  }

  getCount() : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/Article/GetCount`, { withCredentials: true })
  }

  getById(id : number) : Observable<Article> {
    return this.httpClient.get<Article>(`${API_URL}/API/Article/GetById`, { 
      params: { 
        "id": id
      } 
    })
  }

  getByIdStaff(id : number) : Observable<Article> {
    return this.httpClient.get<Article>(`${API_URL}/API/Article/GetByIdStaff`, { 
      params: { 
        "articleId": id
      }, withCredentials: true
    })
  }

  getRecent(language : Language, count : number) : Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${API_URL}/API/Article/GetRecent`, {
      params: {
        "count": count,
        "language": language
      }
    })
  }

  // Get a page with articles (used to realize pagination)
  getPage(language : Language, pageIndex : number, itemsOnPage : number) : Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${API_URL}/API/Article/GetPage`, { 
      params: {
        "language": language,
        "pageIndex": pageIndex,
        "itemsOnPage": itemsOnPage 
      }
    })
  }

  // Get total pages count (used to realize pagination)
  getPagesCount(language : Language, itemsOnPage : number) : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/Article/GetPagesCount`, { 
      params: {
        "language": language,
        "itemsOnPage": itemsOnPage 
      }
    })
  }

  getQueued() : Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${API_URL}/API/Article/GetQueued`,
    { withCredentials: true })
  }

  getQueuedCount() : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/Article/GetQueuedCount`,
    { withCredentials: true })
  }

  approveCreate(articleId : number) {
    return this.httpClient.put<any>(`${API_URL}/API/Article/ApproveCreate`, articleId, { 
      withCredentials: true
    })
  }

  approveEdit(articleId : number) {
    return this.httpClient.put<any>(`${API_URL}/API/Article/ApproveEdit`, articleId, { 
      withCredentials: true
    })
  }

  approveDelete(articleId : number) {
    return this.httpClient.put<any>(`${API_URL}/API/Article/ApproveDelete`, articleId, { 
      withCredentials: true
    })
  }

  declineRequest(articleId : number) {
    return this.httpClient.put<any>(`${API_URL}/API/Article/Decline`, articleId, { 
      withCredentials: true
    })
  }
}
