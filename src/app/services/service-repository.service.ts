import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from '../enum/Language';
import { Observable } from 'rxjs';
import { Service } from '../model/service';
import { API_URL } from 'src/globals';
import { CreateServiceModel } from '../model/requestModels/createServiceModel';
import { EditServiceModel } from '../model/requestModels/editServiceModel';

@Injectable({
  providedIn: 'root'
})
export class ServiceRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getAll(language : Language, categories : number[], searchString : string) : Observable<Service[]> {
    return this.httpClient.get<Service[]>(`${API_URL}/API/Service/GetAll`, {
      params: {
        "language": language,
        "categories": categories,
        "searchString": searchString
      }
    })
  }

  create(serviceModel: CreateServiceModel): Observable<Service> {
    console.log(serviceModel);
    
    let title = serviceModel.title;
    let text = serviceModel.text;
    let isDownloadable = serviceModel.isDownloadable;
    let url = serviceModel.url;
    let categoryId = serviceModel.categoryId;
    let titleImage = serviceModel.titleImage;
    let language = serviceModel.language;

    return this.httpClient.post<any>(`${API_URL}/API/Service/Create`, 
    { title, text, titleImage, language, isDownloadable, url, categoryId },
    { withCredentials: true });
  }

  edit(serviceModel: EditServiceModel) : Observable<Service> {
    let id = serviceModel.id
    let title = serviceModel.title;
    let text = serviceModel.text;
    let titleImage = serviceModel.titleImage;
    let language = serviceModel.language;
    let categoryId = serviceModel.categoryId;
    let url = serviceModel.url;

    return this.httpClient.put<Service>(`${API_URL}/API/Service/Edit`, 
    { id, title, text, titleImage, language, categoryId, url },
    { withCredentials: true });
  }

  delete(id : number) {
    return this.httpClient.get<any>(`${API_URL}/API/Service/Delete`, { 
      params: { 
        "serviceId": id
      }, withCredentials: true
    })
  }

  getAllStaff() : Observable<Service[]> {
    return this.httpClient.get<Service[]>(`${API_URL}/API/Service/GetAllStaff`, { withCredentials: true })
  }

  getCount() : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/Service/GetCount`, { withCredentials: true })
  }

  getById(serviceId : number) : Observable<Service> {
    return this.httpClient.get<Service>(`${API_URL}/API/Service/GetById`, {
      params: {
        "serviceId": serviceId,
      }
    })
  }

  getByIdStaff(serviceId : number) : Observable<Service> {
    return this.httpClient.get<Service>(`${API_URL}/API/Service/GetByIdStaff`, {
      params: {
        "serviceId": serviceId,
      }, withCredentials: true
    })
  }

  getQueued() : Observable<Service[]> {
    return this.httpClient.get<Service[]>(`${API_URL}/API/Service/GetQueued`,
    { withCredentials: true })
  }

  getQueuedCount() : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/Service/GetQueuedCount`,
    { withCredentials: true })
  }
}
