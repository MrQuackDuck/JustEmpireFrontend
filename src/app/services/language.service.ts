import { Injectable } from '@angular/core';
import { Language } from '../enum/Language';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private cookieService : CookieService) { }

  setLanguage(language : Language) {
    this.cookieService.set('language', language.toString());
    window.location.reload();
  }

  getLanguage() : any { 
    return this.cookieService.get('language');
  }

  getLanguageCode() { 
    return Language[this.cookieService.get('language') ?? 0] ?? 'EN';
  }
}
