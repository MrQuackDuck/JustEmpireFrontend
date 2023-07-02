import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getCount() : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/User/GetCount`, { withCredentials: true })
  }

  getNameById(id : number) : Observable<string> {
    return this.httpClient.get<string>(`${API_URL}/API/User/GetNameById`, { withCredentials: true, params: {
      'userId': id
    }})
  }  
}
