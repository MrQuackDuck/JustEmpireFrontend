import { Injectable } from '@angular/core';
import { ServiceVersion } from '../model/serviceVersion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/globals';
import { CreateVersionModel } from '../model/requestModels/createVersionModel';
import { EditVersionModel } from '../model/requestModels/editVersionModel';

@Injectable({
  providedIn: 'root'
})
export class ServiceVersionRepositoryService {
  constructor(private httpClient : HttpClient) { }

  create(versionModel: CreateVersionModel): Observable<ServiceVersion> {
    let title = versionModel.title;
    let text = versionModel.text;
    let serviceId = versionModel.serviceId;

    return this.httpClient.post<ServiceVersion>(`${API_URL}/API/ServiceVersion/Create`, 
    { title, text, serviceId },
    { withCredentials: true });
  }

  edit(versionModel: EditVersionModel) : Observable<ServiceVersion> {
    let id = versionModel.id
    let title = versionModel.title;
    let text = versionModel.text;
    let serviceId = versionModel.serviceId;

    return this.httpClient.put<ServiceVersion>(`${API_URL}/API/ServiceVersion/Edit`, 
    { id, title, text, serviceId },
    { withCredentials: true });
  }

  delete(id : number) {
    return this.httpClient.get<any>(`${API_URL}/API/ServiceVersion/Delete`, { 
      params: { 
        "serviceVersionId": id
      }, withCredentials: true
    })
  }

  getAllStaff() : Observable<ServiceVersion[]> {
    return this.httpClient.get<ServiceVersion[]>(`${API_URL}/API/ServiceVersion/GetAllStaff`, {
      withCredentials: true
    })
  }

  getVersions(serviceId : number) : Observable<ServiceVersion[]> {
    return this.httpClient.get<ServiceVersion[]>(`${API_URL}/API/ServiceVersion/GetVersions`, {
      params: { "serviceId": serviceId }
    })
  }

  getCount() : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/ServiceVersion/GetCount`, { withCredentials: true })
  }

  getLatestVersion(serviceId : number) : Observable<ServiceVersion> {
    return this.httpClient.get<ServiceVersion>(`${API_URL}/API/ServiceVersion/GetLatestVersion`, {
      params: { "serviceId": serviceId }
    })
  }

  getQueued() : Observable<ServiceVersion[]> {
    return this.httpClient.get<ServiceVersion[]>(`${API_URL}/API/ServiceVersion/GetQueued`,
    { withCredentials: true })
  }

  getQueuedCount() : Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/API/ServiceVersion/GetQueuedCount`,
    { withCredentials: true })
  }

  getByIdStaff(id : number) : Observable<ServiceVersion> {
    return this.httpClient.get<ServiceVersion>(`${API_URL}/API/ServiceVersion/GetByIdStaff`, {
      params: {
        "versionId": id,
      }, withCredentials: true
    })
  }

  approveCreate(versionId : number) {
    return this.httpClient.put<any>(`${API_URL}/API/ServiceVersion/ApproveCreate`, versionId, { 
      withCredentials: true
    })
  }

  approveEdit(versionId : number) {
    return this.httpClient.put<any>(`${API_URL}/API/ServiceVersion/ApproveEdit`, versionId, { 
      withCredentials: true
    })
  }

  approveDelete(versionId : number) {
    return this.httpClient.put<any>(`${API_URL}/API/ServiceVersion/ApproveDelete`, versionId, { 
      withCredentials: true
    })
  }

  declineRequest(versionId : number) {
    return this.httpClient.put<any>(`${API_URL}/API/ServiceVersion/Decline`, versionId, { 
      withCredentials: true
    })
  }
}
