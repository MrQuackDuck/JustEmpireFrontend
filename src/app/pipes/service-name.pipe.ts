import { Pipe, PipeTransform } from '@angular/core';
import { ServiceCategoryRepositoryService } from '../services/service-category-repository.service';
import { Observable } from 'rxjs';
import { ServiceCategory } from '../model/serviceCategory';
import { ServiceRepositoryService } from '../services/service-repository.service';
import { Service } from '../model/service';

@Pipe({
  name: 'serviceName'
})
export class ServiceNamePipe implements PipeTransform {
  constructor(private serviceRepository : ServiceRepositoryService) {}

  transform(value: number) : Observable<Service> {
    return this.serviceRepository.getByIdStaff(value);
  }
}