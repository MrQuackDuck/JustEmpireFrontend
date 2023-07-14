import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../enum/Language';
import { LANGUAGES } from 'src/globals';

@Pipe({
  name: 'langFull'
})
export class LangFullPipe implements PipeTransform {
  transform(value: number): string {
    return LANGUAGES[value].key;
  }
}