import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getCount() : Observable<number> {
    return this.httpClient.get<number>('http://localhost:5228/API/User/GetCount', { withCredentials: true })
  }

  getNameById(id : number) : Observable<string> {
    return this.httpClient.get<string>('http://localhost:5228/API/User/GetNameById', { withCredentials: true, params: {
      'userId': id
    }})
  }  
}
