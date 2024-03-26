import { Injectable } from '@angular/core';
import { Language } from '../enum/Language';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private cookieService : CookieService, private location : Location, private router : Router, private http : HttpClient) { }

  setLanguage(language : Language) {
    let currentLanguage = this.getLanguageCode().toLowerCase();
    let newLanguage = Language[language].toLowerCase() ?? 'en';

    this.cookieService.deleteAll('language');
    this.cookieService.set('language', language.toString(), 100, '/');

    let path = this.location.path();
    path = path.replace('/' + currentLanguage, '/' + newLanguage);
    path = path.split('?')[0]; // Removing query params
    
    this.router.navigateByUrl(path).then(() => window.location.reload());
  }

  getLanguage() : any { 
    let language = this.cookieService.get('language');

    // If language cookie is empty or not correct
    if (language === '' || isNaN(+language)) {
      let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone === "Europe/Kyiv") this.setLanguage(Language.UA);
      else this.setLanguage(Language.EN);

      language = this.cookieService.get('language');
    }
    
    return language;
  }

  getLanguageCode() { 
    return Language[this.cookieService.get('language') ?? 0] ?? 'EN';
  }
}
