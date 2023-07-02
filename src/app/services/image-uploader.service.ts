import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {
  constructor(private httpClient : HttpClient) { }

  uploadImage(image : File) : Observable<any> {
   const fileData = new FormData();
   fileData.append('image', image);
   return this.httpClient.post<any>(`${API_URL}/API/Admin/UploadImage`, fileData, { withCredentials: true });
  }
}
