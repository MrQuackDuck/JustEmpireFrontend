import { Pipe, PipeTransform } from '@angular/core';
import * as localization from '../../localization.json';
import { LanguageService } from '../services/language.service';
import { Language } from '../enum/Language';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private languageService : LanguageService) { }

  localization : any = localization;
  currentLanguage : string = 'EN';

  transform(value: string, ...params): string {
    this.currentLanguage = Language[this.languageService.getLanguage() ?? 'EN'] ?? 'EN';

    let result : string = this.localization.Localization[this.currentLanguage][value];

    for (let i = 0; i < params.length; i++) {
        result = result.replaceAll(`{${i}}`, params[i]);
    }

    return result;
  }
}