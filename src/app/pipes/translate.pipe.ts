import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateService : TranslateService) { }

  transform(value: string, ...params): string {
    return this.translateService.translate(value, ...params);
  }
}