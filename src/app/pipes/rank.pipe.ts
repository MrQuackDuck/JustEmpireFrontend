import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../enum/Language';
import { ArticleRepositoryService } from '../services/article-repository.service';
import { UserRepositoryService } from '../services/user-repository.service';
import { RankRepositoryService } from '../services/rank-repository.service';
import { Rank } from '../model/rank';

@Pipe({
  name: 'rank'
})
export class RankPipe implements PipeTransform {
  constructor(private rankRepository : RankRepositoryService) {}

  async transform(value: number): Promise<string> {
    const result : any = await this.rankRepository.getById(value).toPromise();
    return result?.rank?.name  ?? "";
  }
}