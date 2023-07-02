import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../enum/Status';

@Pipe({
  name: 'originalIdTp'
})
export class OriginalIdTooltip implements PipeTransform {
  transform(value: Status | undefined, originalId : number | undefined, postableType : string): string {
    let status : Status = value ?? Status.POSTED;
    switch (status) {
      case Status.QUEUE_UPDATE:
        return `This ${postableType} has been created based on the ${postableType} ID ${originalId}. If the emperor approves this ${postableType}, the changes will be applied to the ${postableType} ID ${originalId}, and this temporary article will disappear.`;
      case Status.QUEUE_DELETE:
        return `This ${postableType} represents the request to delete ${postableType} with ID ${originalId}. If the emperor approves it, ${postableType} with ID ${originalId} will be deleted along with this temporary ${postableType} request.`;
    }

    return "";
  }
}