import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor() { }

  private showLoading : boolean;

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
