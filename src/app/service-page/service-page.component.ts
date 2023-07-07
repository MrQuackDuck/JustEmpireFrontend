import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServiceRepositoryService } from '../services/service-repository.service';
import { ServiceVersionRepositoryService } from '../services/service-version-repository.service';
import { ServiceImageRepositoryService } from '../services/service-image-repository.service';
import { Service } from '../model/service';
import { ServiceCategoryRepositoryService } from '../services/service-category-repository.service';
import { ServiceCategory } from '../model/serviceCategory';
import { ServiceVersion } from '../model/serviceVersion';
import { ServiceImage } from '../model/serviceImage';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { API_URL } from 'src/globals';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.css']
})
export class ServicePageComponent { }
