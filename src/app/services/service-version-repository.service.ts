import { Injectable } from '@angular/core';
import { ServiceVersion } from '../model/serviceVersion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceVersionRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getVersions(serviceId : number) : Observable<ServiceVersion[]> {
    return this.httpClient.get<ServiceVersion[]>('http://localhost:5228/API/Version/GetVersions', {
      params: { "serviceId": serviceId }
    })
  }

  getCount() : Observable<number> {
    return this.httpClient.get<number>('http://localhost:5228/API/ServiceVersion/GetCount', { withCredentials: true })
  }

  getLatestVersion(serviceId : number) : Observable<ServiceVersion> {
    return this.httpClient.get<ServiceVersion>('http://localhost:5228/API/Version/GetLatestVersion', {
      params: { "serviceId": serviceId }
    })
  }
}
