import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient : HttpClient) { }

  login(username, password) {
    return this.httpClient.post<any>("http://localhost:5228/API/Auth/Login", 
      { username, password },
      { withCredentials: true });
  }

  async isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getUser().subscribe(
        success => resolve(true),
        fail => resolve(false)
      );
    });
  }

  getUser() : Observable<User> {
    return this.httpClient.get<User>("http://localhost:5228/API/Auth/User",
      { withCredentials: true });
  }
}
