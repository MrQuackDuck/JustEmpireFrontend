import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../enum/Status';

@Pipe({
  name: 'statusCode'
})
export class StatusCodePipe implements PipeTransform {
  transform(value: Status | undefined): string {
    let status : Status = value ?? Status.POSTED;
    switch (status) {
      case Status.POSTED:
        return "STATUS_POSTED";
      case Status.QUEUE_CREATE:
        return "STATUS_CREATE";
      case Status.QUEUE_UPDATE:
        return "STATUS_EDIT";
      case Status.QUEUE_DELETE:
        return "STATUS_DELETE";
    }
  }
}