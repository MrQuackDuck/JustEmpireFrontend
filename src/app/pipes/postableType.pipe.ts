import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../enum/Status';
import { PostableType } from '../enum/PostableType';

@Pipe({
  name: 'postableType'
})
export class PostableTypePipe implements PipeTransform {
  transform(value: PostableType | undefined): string {
    let type : PostableType = value ?? PostableType.ARTICLE;
    switch (type) {
        case PostableType.ARTICLE:
            return "📰 Article";
        case PostableType.SERVICE:
            return "📦 Service";
        case PostableType.CATEGORY:
            return "🔠 Category";
        case PostableType.VERSION:
            return "🐧 Version";
        case PostableType.IMAGE:
            return "🖼️ Image";
            
    }
  }
}