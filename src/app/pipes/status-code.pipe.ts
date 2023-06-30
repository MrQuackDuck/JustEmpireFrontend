import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../enum/Language';
import { Status } from '../enum/Status';

@Pipe({
  name: 'statusCode'
})
export class StatusCodePipe implements PipeTransform {
  transform(value: Status | undefined): string {
    let status : Status = value ?? Status.POSTED;
    switch (status) {
      case Status.POSTED:
        return "✅ Posted";
      case Status.QUEUE_CREATE:
        return "🕒 In queue to create";
      case Status.QUEUE_UPDATE:
        return "📝 Pending editing";
      case Status.QUEUE_DELETE:
        return "❌ Pending delete";
    }

    return "UNDEFINED";
  }
}