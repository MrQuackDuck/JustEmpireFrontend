import { Component, Input } from '@angular/core';
import { Service } from '../model/service';
import { ServiceVersion } from '../model/serviceVersion';
import { ServiceVersionRepositoryService } from '../services/service-version-repository.service';
import { ServiceCategory } from '../model/serviceCategory';
import { ServiceCategoryRepositoryService } from '../services/service-category-repository.service';
import { Language } from '../enum/Language';
import slugify from 'slugify';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
  constructor(private versionRepository : ServiceVersionRepositoryService, private serviceCategoryRepository : ServiceCategoryRepositoryService) {}

  @Input()
  service : Service;

  latestVersion? : ServiceVersion;
  languageCode : string;
  slugifiedTitle : string;
  currentCategory? : ServiceCategory;

  ngOnInit() {
    this.languageCode = Language[this.service.language];
    this.slugifiedTitle = slugify(this.service.title, '-').toLowerCase();
    this.getLatestServiceVersion(this.service.id)
    this.serviceCategoryRepository.getById(this.service.categoryId).subscribe(category => {
      this.currentCategory = category;
    })
  }

  getLatestServiceVersion(serviceId : number) {
    this.versionRepository.getLatestVersion(serviceId).subscribe(value =>{
       this.latestVersion = value
      });
  }
}
