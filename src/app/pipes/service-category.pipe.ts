import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../enum/Language';
import { ServiceCategoryRepositoryService } from '../services/service-category-repository.service';
import { Observable } from 'rxjs';
import { ServiceCategory } from '../model/serviceCategory';

@Pipe({
  name: 'category'
})
export class ServiceCategoryPipe implements PipeTransform {
  constructor(private categoryRepository : ServiceCategoryRepositoryService) {}

  transform(value: number) : Observable<ServiceCategory> {
    return this.categoryRepository.getById(value);
  }
}