import { Pipe, PipeTransform } from '@angular/core';
import { PostableType } from '../enum/PostableType';

@Pipe({
  name: 'postableType'
})
export class PostableTypePipe implements PipeTransform {
  transform(value: PostableType | undefined): string {
    let type : PostableType = value ?? PostableType.ARTICLE;
    switch (type) {
        case PostableType.ARTICLE:
            return "TYPE_ARTICLE";
        case PostableType.SERVICE:
            return "TYPE_SERVICE";
        case PostableType.CATEGORY:
            return "TYPE_CATEGORY";
        case PostableType.VERSION:
            return "TYPE_VERSION";
        case PostableType.IMAGE:
            return "TYPE_IMAGE";
            
    }
  }
}