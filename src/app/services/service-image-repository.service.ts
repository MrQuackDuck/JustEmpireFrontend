import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceImage } from '../model/serviceImage';

@Injectable({
  providedIn: 'root'
})
export class ServiceImageRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getCount() : Observable<number> {
    return this.httpClient.get<number>('http://localhost:5228/API/ServiceImage/GetCount', { withCredentials: true })
  }

  getImages(serviceId : number) : Observable<ServiceImage[]> {
    return this.httpClient.get<ServiceImage[]>('http://localhost:5228/API/ServiceImage/GetImages', {
      params: {
        "serviceId": serviceId,
      }
    })
  }
}
