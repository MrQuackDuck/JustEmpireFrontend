import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from '../enum/Language';
import { Observable } from 'rxjs';
import { Service } from '../model/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getAll(language : Language, categories : number[], searchString : string) : Observable<Service[]> {
    return this.httpClient.get<Service[]>('http://localhost:5228/API/Service/GetAll', {
      params: {
        "language": language,
        "categories": categories,
        "searchString": searchString
      }
    })
  }

  getCount() : Observable<number> {
    return this.httpClient.get<number>('http://localhost:5228/API/Service/GetCount', { withCredentials: true })
  }

  getById(serviceId : number) : Observable<Service> {
    return this.httpClient.get<Service>('http://localhost:5228/API/Service/GetById', {
      params: {
        "serviceId": serviceId,
      }
    })
  }
}
