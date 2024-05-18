import { Pipe, PipeTransform } from '@angular/core';
import { UserRepositoryService } from '../services/user-repository.service';

@Pipe({
  name: 'author'
})
export class AuthorPipe implements PipeTransform {
  constructor(private userRepository : UserRepositoryService) {}

  async transform(value: number): Promise<string> {
    const result : any = await this.userRepository.getNameById(value).toPromise();
    return result?.username ?? "";
  }
}