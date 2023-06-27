import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor() { }

  public showLoading : boolean;

  enableLoading() {
    this.showLoading = true;
  }

  disableLoading() {
    this.showLoading = false;
  }

  isLoading() : boolean {
    return this.showLoading;
  }
}
