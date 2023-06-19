import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {
  constructor(private httpClient : HttpClient) { }

  getViews(hours : number = 0, minutes : number = 0, seconds : number = 0) : Observable<number> {
    return this.httpClient.get<number>('http://localhost:5228/API/Admin/GetViews', {
      params: { 
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds 
      },
      withCredentials: true
    })
  }
}
