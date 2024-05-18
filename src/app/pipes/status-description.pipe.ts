import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../enum/Status';

@Pipe({
  name: 'statusDescription'
})
export class StatusDescriptionPipe implements PipeTransform {
  transform(value: Status | undefined, postableType : string | undefined): string {
    let status : Status = value ?? Status.POSTED;
    switch (status) {
      case Status.POSTED:
        return "";
      case Status.QUEUE_CREATE:
        return `Emperor can approve the creation of ${postableType}`;
      case Status.QUEUE_UPDATE:
        return `Emperor can approve edit of ${postableType}`;
      case Status.QUEUE_DELETE:
        return `Emperor can approve deletion of ${postableType}`;
    }
  }
}