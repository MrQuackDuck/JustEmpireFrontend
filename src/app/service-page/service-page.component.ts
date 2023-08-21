import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from '../enum/Language';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.css']
})
export class ServicePageComponent {
  constructor(private location : Location, private route : ActivatedRoute, private router : Router, 
    private language : LanguageService) { }

  selectedCategories : any;
  searchString : any;
  currentLanguage : any;

  ngOnInit() {
    let selectedCategories = this.route.snapshot.queryParamMap.get('categories');
    this.searchString = this.route.snapshot.queryParamMap.get('searchString');
    if (selectedCategories != '') this.selectedCategories = selectedCategories;

    this.currentLanguage = this.language.getLanguageCode().toLowerCase();
  }

  preventContextMenu() {
    return false;
  }

  back() {
    this.router.navigate([this.currentLanguage, 'services'], { queryParams: { 'categories': this.selectedCategories, 
    'searchString': this.searchString } })
  }
}
