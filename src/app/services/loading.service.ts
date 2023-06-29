import { Injectable, Renderer2 } from '@angular/core';
import { ScrollService } from './scroll.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(private scrollService : ScrollService) { }

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
