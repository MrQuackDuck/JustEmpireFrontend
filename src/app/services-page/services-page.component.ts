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

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent {
  constructor(private route : ActivatedRoute, private router: Router, private serviceRepository : ServiceRepositoryService,
    private serviceCategoryRepository : ServiceCategoryRepositoryService, private loadingService : LoadingService,
    private languageService : LanguageService) {}

    services$ : Observable<Service[]>;
    serviceCategories$ : Observable<ServiceCategory[]>;
    selectedCategories : number[] = [];
    language : Language;
    searchString : string = "";
    showLoading : boolean = false;
    nothingFound : boolean = false;
    readonly pageName : string = "services";

    ngOnInit() {
      let language : Language = this.route.snapshot.params['language'];
      
      // If 'Language' enum not includes provided value, then redirect user to default language page
      if (!Object.values(Language).includes(language)) {
        this.language = this.languageService.getLanguage();
        this.router.navigate([this.pageName, this.languageService.getLanguageCode()]); // TODO: Get actual site language
      } 
      else {
        this.language = language;
      }

      this.updateData();
    }

    async updateData() {   
      this.loadingService.enableLoading();
      await this.delay(100);

      this.services$ = this.serviceRepository.getAll(this.language, this.selectedCategories, this.searchString)
      this.services$.subscribe(services => {
        this.nothingFound = services.length == 0;
      })
      
      if (this.serviceCategories$ == null) {
        this.serviceCategories$ = this.serviceCategoryRepository.getAll(this.language);
        this.serviceCategories$.subscribe(categories => {
          categories.forEach(category => this.selectedCategories.push(category.id));
        })
      }
      
      await this.delay(100);
      this.services$.subscribe(() => this.loadingService.disableLoading())
    }

    search() {
      this.updateData();
      return false;
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
