import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Rank } from '../model/rank';
import { API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient : HttpClient) { }

  login(username, password) {
    return this.httpClient.post<any>(`${API_URL}/API/Auth/Login`, 
      { username, password },
      { withCredentials: true });
  }

  changePassword(oldPassword, newPassword) {
    return this.httpClient.post<any>(`${API_URL}/API/Auth/ChangePassword`, 
      { oldPassword, newPassword },
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
    return this.httpClient.get<User>(`${API_URL}/API/Auth/User`,
      { withCredentials: true });
  }

  getCurrentRank() : Observable<Rank> {
    return this.httpClient.get<Rank>(`${API_URL}/API/Auth/CurrentRank`,
    { withCredentials: true });
  }

  logOut() {
    return this.httpClient.get<any>(`${API_URL}/API/Auth/Logout`,
    { withCredentials: true });
  }
}
