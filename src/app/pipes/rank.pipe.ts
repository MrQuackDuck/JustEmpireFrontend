import { Pipe, PipeTransform } from '@angular/core';
import { RankRepositoryService } from '../services/rank-repository.service';

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