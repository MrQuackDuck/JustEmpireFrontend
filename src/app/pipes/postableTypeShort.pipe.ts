import { Pipe, PipeTransform } from '@angular/core';
import { PostableType } from '../enum/PostableType';

@Pipe({
  name: 'postableTypeShort'
})
export class PostableTypeShortPipe implements PipeTransform {
  transform(value: PostableType | undefined): string {
    let type : PostableType = value ?? PostableType.ARTICLE;
    switch (type) {
        case PostableType.ARTICLE:
            return "article";
        case PostableType.SERVICE:
            return "service";
        case PostableType.CATEGORY:
            return "category";
        case PostableType.VERSION:
            return "version";
        case PostableType.IMAGE:
            return "image";
            
    }
  }
}