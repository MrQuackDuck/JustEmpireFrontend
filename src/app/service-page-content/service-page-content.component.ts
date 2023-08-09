import { Component, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { API_URL } from 'src/globals';
import { Service } from '../model/service';
import { ServiceCategory } from '../model/serviceCategory';
import { ServiceImage } from '../model/serviceImage';
import { ServiceVersion } from '../model/serviceVersion';
import { LoadingService } from '../services/loading.service';
import { ServiceCategoryRepositoryService } from '../services/service-category-repository.service';
import { ServiceImageRepositoryService } from '../services/service-image-repository.service';
import { ServiceRepositoryService } from '../services/service-repository.service';
import { ServiceVersionRepositoryService } from '../services/service-version-repository.service';
import { TranslateService } from '../services/translate.service';
import { NotifierService } from 'angular-notifier';
import { TitleService } from '../services/title-service.service';

@Component({
  selector: 'service-page-content',
  templateUrl: './service-page-content.component.html',
  styleUrls: ['./service-page-content.component.css']
})
export class ServicePageContentComponent {
  constructor(private serviceRepository : ServiceRepositoryService,
    private serviceVersionRepository : ServiceVersionRepositoryService,
    private serviceImageRepository : ServiceImageRepositoryService,
    private serviceCategoryRepository : ServiceCategoryRepositoryService,
    private router : Router,
    private route : ActivatedRoute,
    private loadingService : LoadingService,
    private notifierService : NotifierService,
    private translateService : TranslateService,
    private titleService : TitleService)
    { }

    @Input()
    isStaff : boolean;

    @Input()
    staffServiceId : number
  
    API_URL = API_URL;
  
    id; // Id of the target service
    service? : Service; // The target service
    selectedTab : string; // Selected tab (screnshots or versions)
    currentCategory : ServiceCategory; // Category of a service
    currentVersion? : ServiceVersion; // Latest version of a service
    versions$ : Observable<ServiceVersion[]>; // All service's versions
    screenshots$ : Observable<ServiceImage[]>; // All service's screenshots
    screenshots : ServiceImage[];
    screenshotsCount : number;
    imageViewerIndex : number = 0; // The index of image that is currently being viewed
    isImageViewerShown : boolean = false; // Is the image viewer shown
    currentReaderVersion? : ServiceVersion; // Current version of service that is being displayed in version-reader
    isVersionReaderShown : boolean; // If the version-reader shown
    versionsCount : number;
  
    ngOnInit() {
      this.selectedTab = "description";
  
      if (this.isStaff) {
        this.updateDataStaff();
        return;
      }

      this.route.paramMap.subscribe((params: ParamMap)=>
      {
          this.id = params.get('id');
          this.updateData();
      });  
    }

    ngOnChanges(changes : SimpleChanges) {
      if (this.isStaff) {
        this.updateDataStaff();
      }
    }
  
    updateData() {
      this.loadingService.enableLoading();
  
      // Getting service by id
      this.serviceRepository.getById(this.id).subscribe(async service => {
        this.titleService.setTitle(service.title);
        this.service = service;
  
        // Getting service's category by category ID
        this.serviceCategoryRepository.getById(this.service.categoryId).subscribe(category => {
          this.currentCategory = category;
        })
  
        // Getting service's latest version by ID
        this.serviceVersionRepository.getLatestVersion(this.id).subscribe(version => {
          this.currentVersion = version;
        })
  
        // Getting all service versions by ID
        this.versions$ = this.serviceVersionRepository.getVersions(this.id);
        this.versions$.subscribe(versions => {
          this.versionsCount = versions.length;
        })
  
        // Getting service's screenshots by ID
        this.screenshots$ = this.serviceImageRepository.getImages(this.id);
        this.screenshots$.subscribe(screenshots => {
          this.screenshots = screenshots;
          this.screenshotsCount = screenshots.length;
        })
        
        this.loadingService.disableLoading();
      }, error => {
        if (error.status == 503) {
          this.notifierService.notify('error', this.translateService.translate('TOO_MANY_REQUESTS'));
          return;
        }
        this.router.navigate(['/404'])
        this.loadingService.disableLoading();
      })
    }

    updateDataStaff() {
      this.loadingService.enableLoading();
  
      // Getting service by id
      this.serviceRepository.getByIdStaff(this.staffServiceId).subscribe(async service => {
        this.service = service;
  
        // Getting service's category by category ID
        this.serviceCategoryRepository.getById(this.service.categoryId).subscribe(category => {
          this.currentCategory = category;
        })
  
        // Getting service's latest version by ID
        this.serviceVersionRepository.getLatestVersion(this.staffServiceId).subscribe(version => {
          this.currentVersion = version;
        })
  
        // Getting all service versions by ID
        this.versions$ = this.serviceVersionRepository.getVersions(this.staffServiceId);
        this.versions$.subscribe(versions => {
          this.versionsCount = versions.length;
        })
  
        // Getting service's screenshots by ID
        this.screenshots$ = this.serviceImageRepository.getImagesStaff(this.staffServiceId);
        this.screenshots$.subscribe(screenshots => {
          this.screenshots = screenshots;
          this.screenshotsCount = screenshots.length;
        })
        
        this.loadingService.disableLoading();
      }, error => {
        if (error.status == 503) {
          this.notifierService.notify('error', this.translateService.translate('TOO_MANY_REQUESTS'));
          return;
        }
        this.router.navigate(['/404'])
        this.loadingService.disableLoading();
      })
    }
  
    // Check if provided tab is curretly active
    isTabCurrentlyActive(tab) : boolean {
      if (tab === this.selectedTab) return true;
      return false;
    }
  
    showImageViewer(index) {
      this.imageViewerIndex = index;
      console.log(index);
      
      this.isImageViewerShown = true;
    }
  
    imageChanged(index) {
      this.imageViewerIndex = index;
    }
  
    disableImageViewer() {
      this.isImageViewerShown = false;
    }
  
    // Set current tab
    setTab(tab) {
      this.selectedTab = tab;
    }
  
    showVersionReader(version) {
      this.currentReaderVersion = version;
      this.isVersionReaderShown = true;
    }
  
    hideVersionReader() {
      this.currentReaderVersion = undefined;
      this.isVersionReaderShown = false;
    }
}
