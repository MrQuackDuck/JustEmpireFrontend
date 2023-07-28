import { Injectable } from '@angular/core';
import { Language } from '../enum/Language';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private cookieService : CookieService, private location : Location,
    private router : Router) { }

  setLanguage(language : Language) {
    let currentLanguage = this.getLanguageCode().toLowerCase();
    let newLanguage = Language[language].toLowerCase() ?? 'en';

    this.cookieService.deleteAll('language');
    this.cookieService.set('language', language.toString(), 100, '/');

    let path = this.location.path();
    path = path.replace('/' + currentLanguage, '/' + newLanguage);
    
    this.router.navigateByUrl(path).then(() => window.location.reload());
  }

  getLanguage() : any { 
    let language = this.cookieService.get('language');
    if (language === '') return 0;
    return language;
  }

  getLanguageCode() { 
    return Language[this.cookieService.get('language') ?? 0] ?? 'EN';
  }
}
