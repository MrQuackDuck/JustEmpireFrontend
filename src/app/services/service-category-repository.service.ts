import { Injectable } from '@angular/core';
import { Language } from '../enum/Language';
import { ServiceCategory } from '../model/serviceCategory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/globals';
import { CreateServiceCategoryModel } from '../model/requestModels/createServiceCategoryModel';
import { EditServiceCategoryModel } from '../model/requestModels/editServiceCategoryModel';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryRepositoryService {
  constructor(private httpClient : HttpClient) { }

  create(categoryModel: CreateServiceCategoryModel): Observable<ServiceCategory> {
    let title = categoryModel.title;
    let language = categoryModel.language;

    return this.httpClient.post<any>(`${API_URL}/API/ServiceCategory/Create`, 
    { title, language },
    { withCredentials: true });
  }

  edit(categoryModel: EditServiceCategoryModel): Observable<boolean> {
    let id = categoryModel.id
    let title = categoryModel.title;
    let language = categoryModel.language;

    return this.httpClient.put<boolean>(`${API_URL}/API/ServiceCategory/Edit`, 
    { id, title, language },
    { withCredentials: true });
  }

  delete(id : number) : Observable<boolean> {
    return this.httpClient.get<any>(`${API_URL}/API/ServiceCategory/Delete`, { 
      params: { 
        "serviceCategoryId": id
      }, withCredentials: true
    })
  }

  getCount() : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/ServiceCategory/GetCount`, { withCredentials: true })
  }

  getById(id : number) : Observable<ServiceCategory> {
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

  getQueued() : Observable<ServiceCategory[]> {
    return this.httpClient.get<ServiceCategory[]>(`${API_URL}/API/ServiceCategory/GetQueued`,
    { withCredentials: true })
  }

  getQueuedCount() : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/ServiceCategory/GetQueuedCount`,
    { withCredentials: true })
  }
}