import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  enableScrolling() {
    this.renderer.removeClass(document.body, 'disable-scroll');
  }

  disableScrolling() {
    this.renderer.addClass(document.body, 'disable-scroll');
  }
}
