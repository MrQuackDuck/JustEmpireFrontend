import { Injectable } from '@angular/core';
import { ServiceVersion } from '../model/serviceVersion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class ServiceVersionRepositoryService {
  constructor(private httpClient : HttpClient) { }

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
}
