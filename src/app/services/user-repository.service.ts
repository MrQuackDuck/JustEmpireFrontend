import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API_URL } from 'src/globals';
import { CreateUserModel } from '../model/requestModels/createUserModel';
import { EditUserModel } from '../model/requestModels/editUserModel';
import { User } from '../model/user';

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
  
  getAllStaff() : Observable<User[]> {
    return this.httpClient.get<User[]>(`${API_URL}/API/User/GetAllStaff`, { withCredentials: true })
  }

  create(userModel : CreateUserModel) { 
    let username = userModel.username;
    let password = userModel.password;
    let rankId = userModel.rankId;

    return this.httpClient.post<User>(`${API_URL}/API/User/Create`, 
    { username, password, rankId },
    { withCredentials: true });
  }

  edit(userModel : EditUserModel) {
    let id = userModel.id;
    let username = userModel.username;
    let rankId = userModel.rankId;

    return this.httpClient.put<User>(`${API_URL}/API/User/Edit`, 
    { id, username, rankId },
    { withCredentials: true });
  }

  delete(userId : number) { 
    return this.httpClient.get<any>(`${API_URL}/API/User/Delete`, { 
      params: { 
        "userId": userId
      }, withCredentials: true
    })
  }
}
