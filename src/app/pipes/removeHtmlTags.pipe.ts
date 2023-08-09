import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../enum/Language';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { UserRepositoryService } from '../services/user-repository.service';
import { RankRepositoryService } from '../services/rank-repository.service';
import { Rank } from '../model/rank';

@Pipe({
  name: 'removeHtmlTags'
})
export class RemoveHtmlTagsPipe implements PipeTransform {
  constructor(private rankRepository : RankRepositoryService) {}

  transform(value : string) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = value;
    return tmp.textContent || tmp.innerText || "";
  }
}