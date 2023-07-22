import { Component } from '@angular/core';
import { ServiceRepositoryService } from '../services/service-repository.service';
import { ServiceVersionRepositoryService } from '../services/service-version-repository.service';
import { Observable } from 'rxjs';
import { Service } from '../model/service';
import { ServiceVersion } from '../model/serviceVersion';
import { ServiceCategoryRepositoryService } from '../services/service-category-repository.service';
import { ServiceCategory } from '../model/serviceCategory';
import { Language } from '../enum/Language';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '../services/translate.service';
import { NotifierService } from 'angular-notifier';
import { TitleService } from '../services/title-service.service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent {
  constructor(private route : ActivatedRoute, private router: Router, private serviceRepository : ServiceRepositoryService,
    private serviceCategoryRepository : ServiceCategoryRepositoryService, private loadingService : LoadingService,
    private languageService : LanguageService, private notifierService : NotifierService, 
    private translateService : TranslateService, private titleService : TitleService) {}

    services$ : Observable<Service[]>;
    services : Service[];
    serviceCategories$ : Observable<ServiceCategory[]>;
    serviceCategories : ServiceCategory[];
    selectedCategories : number[] = [];
    language : Language;
    searchString : string = "";
    showLoading : boolean = false;
    nothingFound : boolean = false;
    readonly pageName : string = "services";

    ngOnInit() {
      this.titleService.setTitle(this.translateService.translate('SERVICES'));

      let language : Language = this.route.snapshot.params['language']?.toUpperCase();
      
      // If 'Language' enum not includes provided value, then redirect user to default language page
      if (!Object.values(Language).includes(language)) {
        this.language = this.languageService.getLanguage();
        this.router.navigate([this.languageService.getLanguageCode().toLowerCase(), this.pageName]);
      } 
      else {
        this.language = language;
      }

      this.updateData();
    }

    search() {
      this.updateData();
      return false;
    }

    async updateData() {   
      this.loadingService.enableLoading();
      await this.delay(100);

      this.services$ = this.serviceRepository.getAll(this.language, this.selectedCategories, this.searchString)
      this.services$.subscribe(services => {
        this.services = services;
        this.nothingFound = services.length == 0;
        this.loadingService.disableLoading();
      }, error => {
        if (error.status == 503) this.notifierService.notify('error', this.translateService.translate('TOO_MANY_REQUESTS'));
        return;
      })
      
      if (this.serviceCategories$ != null) return;

      this.serviceCategories$ = this.serviceCategoryRepository.getAll(this.language);
      this.serviceCategories$.subscribe(categories => {
        this.serviceCategories = categories;
        categories.forEach(category => this.selectedCategories.push(category.id));
      })
    }

    categoryClicked(event, id) {
      if (event.checked === false) {
        let targetCategory = this.selectedCategories.indexOf(id);
        this.selectedCategories.splice(targetCategory, 1);
        return;
      }

      this.selectedCategories.push(id);
    }

    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    updateSearchString(event) {
      this.searchString = event.value;
    }
}
