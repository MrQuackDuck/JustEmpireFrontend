import { Injectable } from '@angular/core';
import { Postable } from '../model/postable';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/globals';
import { Observable } from 'rxjs';
import { SearchPostable } from '../model/searchPostable';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private httpClient : HttpClient) { }

  find(input : string) : Observable<SearchPostable[]> {
    return this.httpClient.get<SearchPostable[]>(`${API_URL}/API/Search/Find`, { 
      params: { 
        "searchString": input
      }
    })
  }
}
