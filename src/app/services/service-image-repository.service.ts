import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceImage } from '../model/serviceImage';
import { API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class ServiceImageRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getCount() : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/ServiceImage/GetCount`, { withCredentials: true })
  }

  getImages(serviceId : number) : Observable<ServiceImage[]> {
    return this.httpClient.get<ServiceImage[]>(`${API_URL}/API/ServiceImage/GetImages`, {
      params: {
        "serviceId": serviceId,
      }
    })
  }
}
