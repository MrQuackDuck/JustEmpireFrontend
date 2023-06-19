import { Injectable } from '@angular/core';
import { Language } from '../enum/Language';
import { ServiceCategory } from '../model/serviceCategory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getCount() : Observable<number> {
    return this.httpClient.get<number>('http://localhost:5228/API/ServiceCategory/GetCount', { withCredentials: true })
  }

  getById(id : number) {
    return this.httpClient.get<ServiceCategory>('http://localhost:5228/API/ServiceCategory/GetById', 
    { params: { "id": id } })
  }

  getAll(language : Language) : Observable<ServiceCategory[]> {
    return this.httpClient.get<ServiceCategory[]>('http://localhost:5228/API/ServiceCategory/GetAll', 
    { params: { "language": language } })
  }
}
