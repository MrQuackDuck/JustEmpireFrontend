import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rank } from '../model/rank';
import { API_URL } from 'src/globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getById(id : number) : Observable<Rank> {
    return this.httpClient.get<Rank>(`${API_URL}/API/Rank/GetById`, 
    { withCredentials: true, params: { "id": id } })
  }

  getAllStaff() : Observable<Rank[]> {
    return this.httpClient.get<Rank[]>(`${API_URL}/API/Rank/GetAllStaff`, { withCredentials: true })
  }
}
