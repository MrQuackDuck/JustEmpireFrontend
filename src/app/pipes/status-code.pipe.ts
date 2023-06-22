import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../enum/Language';
import { Status } from '../enum/Status';

@Pipe({
  name: 'statusCode'
})
export class StatusCodePipe implements PipeTransform {
  transform(value: Status | undefined): string {
    if (value === undefined) {
        return "UNDEFINED"
    }
    let status : Status = value ?? Status.POSTED;
    return Status[status];
  }
}