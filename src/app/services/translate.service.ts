import { Injectable } from '@angular/core';
import { Language } from '../enum/Language';
import { LanguageService } from './language.service';
import * as localization from '../../localization.json';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  constructor(private languageService : LanguageService) { }

  localization : any = localization;
  currentLanguage : string = 'EN';

  translate(value: string, ...params): string {
    this.currentLanguage = Language[this.languageService.getLanguage() ?? 'EN'] ?? 'EN';

    let result : string = this.localization.Localization[this.currentLanguage][value];

    for (let i = 0; i < params.length; i++) {
        result = result.replaceAll(`{${i}}`, params[i]);
    }

    return result;
  }
}
