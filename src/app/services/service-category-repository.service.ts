import { Injectable } from '@angular/core';
import { Language } from '../enum/Language';
import { ServiceCategory } from '../model/serviceCategory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getCount() : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/ServiceCategory/GetCount`, { withCredentials: true })
  }

  getById(id : number) {
    return this.httpClient.get<ServiceCategory>(`${API_URL}/API/ServiceCategory/GetById`, 
    { params: { "id": id } })
  }

  getAll(language : Language) : Observable<ServiceCategory[]> {
    return this.httpClient.get<ServiceCategory[]>(`${API_URL}/API/ServiceCategory/GetAll`, 
    { params: { "language": language } })
  }

  getAllStaff() : Observable<ServiceCategory[]> {
    return this.httpClient.get<ServiceCategory[]>(`${API_URL}/API/ServiceCategory/GetAllStaff`, { withCredentials: true })
  }
}
