import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../enum/Language';

@Pipe({
  name: 'langCode'
})
export class LangCodePipe implements PipeTransform {
  transform(value: number): string {
    return Language[value];
  }
}