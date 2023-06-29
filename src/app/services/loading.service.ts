import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ScrollService } from './scroll.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
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
