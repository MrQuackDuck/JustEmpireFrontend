import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
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