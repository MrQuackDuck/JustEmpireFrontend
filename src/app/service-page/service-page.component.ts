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

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.css']
})
export class ServicePageComponent {
  constructor(private serviceRepository : ServiceRepositoryService,
  private serviceVersionRepository : ServiceVersionRepositoryService,
  private serviceImageRepository : ServiceImageRepositoryService,
  private serviceCategoryRepository : ServiceCategoryRepositoryService,
  private router : Router,
  private route : ActivatedRoute) { }

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
    this.selectedTab = "screenshots";

    this.route.paramMap.subscribe((params: ParamMap)=>
    {
        this.id = params.get('id');
        this.updateData();
    });  
  }

  updateData() {
    // Getting service by id
    this.serviceRepository.getById(this.id).subscribe(async service => {
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
    }, error => this.router.navigate(['/404']))
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
