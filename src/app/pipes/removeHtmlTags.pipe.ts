import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtmlTags',
})
export class RemoveHtmlTagsPipe implements PipeTransform {
  transform(value: string) {
    let tmp = document.createElement('DIV');
    tmp.innerHTML = value;
    return tmp.textContent || tmp.innerText || '';
  }
}
