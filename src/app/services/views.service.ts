import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {
  constructor(private httpClient : HttpClient) { }

  getViews(hours : number = 0, minutes : number = 0, seconds : number = 0) : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/Admin/GetViews`, {
      params: { 
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds 
      },
      withCredentials: true
    })
  }
}
