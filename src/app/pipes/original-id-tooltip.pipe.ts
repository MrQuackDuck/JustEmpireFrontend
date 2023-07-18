import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../enum/Status';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'originalIdTp'
})
export class OriginalIdTooltip implements PipeTransform {
  constructor(private translateService : TranslateService) { }

  transform(value: Status | undefined, originalId : number | undefined, postableType : string): string {
    let status : Status = value ?? Status.POSTED;
    switch (status) {
      case Status.QUEUE_UPDATE:
        return this.translateService.translate("ORIGINAL_ID_DESCRIPTION", postableType, originalId);
      case Status.QUEUE_DELETE:
        return this.translateService.translate("ORIGINAL_ID_DESCRIPTION_DELETE", postableType, originalId);
    }

    return "";
  }
}