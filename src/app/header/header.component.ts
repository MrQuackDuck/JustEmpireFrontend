import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Location } from '@angular/common';
import { SearchService } from '../services/search.service';
import { PostableType } from '../enum/PostableType';
import { SearchPostable } from '../model/searchPostable';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '../services/translate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class HeaderComponent {
  constructor(public language : LanguageService, private location : Location,
  private searchService : SearchService, private notifierService : NotifierService,
  private translateService : TranslateService, public router : Router) { }

  // Search icon | Cross icon
  currentIcon = "../../assets/images/svg/search_icon.svg";

  toggleSearch() : void {
    let nav = document.querySelector(".nav"),
    searchIcon = document.querySelector("#searchIcon")
    nav?.classList.toggle("openSearch");
    nav?.classList.remove("openNav");
    if (nav?.classList.contains("openSearch")) {
        searchIcon?.classList.replace("uil-search", "uil-times");
        this.currentIcon = "../../assets/images/svg/cross-1.svg";
        return;
    }

    this.currentIcon = "../../assets/images/svg/search_icon.svg";
  }

  disableSearch() : void {
    let nav = document.querySelector(".nav"),
    searchIcon = document.querySelector("#searchIcon")
    nav?.classList.remove("openSearch");
    if (nav?.classList.contains("openSearch")) {
        searchIcon?.classList.replace("uil-search", "uil-times");
        this.currentIcon = "../../assets/images/svg/cross-1.svg";
        return;
    }
    
    this.currentIcon = "../../assets/images/svg/search_icon.svg";
  }

  openNav() : void {
    let nav = document.querySelector(".nav"),
    searchIcon = document.querySelector("#searchIcon")
    nav?.classList.add("openNav");
    nav?.classList.remove("openSearch");
    searchIcon?.classList.replace("uil-times", "uil-search");
  }

  closeNav() : void {
    let nav = document.querySelector(".nav")
    nav?.classList.remove("openNav");
  }

  onClick(event) {
    if (event.target.tagName == "INPUT") return;
    if (event.target.tagName == "IMG") return;
    if (event.target.tagName == "UL") return;
    if (event.target.tagName == "I") return;
    
    this.closeNav();
    this.disableSearch();
  }

  searchResults : SearchPostable[] = [];

  find(event) {
    let searchString : any = document.querySelector('input')?.value;
    if (searchString == '') 
    {
      this.searchResults = [];
      return;
    }
    this.searchService.find(searchString).subscribe(results => {
      results.forEach(element => {
        if (element.type == PostableType.ARTICLE) element.url = `/article/${element.id}`;
        if (element.type == PostableType.SERVICE) element.url = `/service/${element.id}`;

        let bolder = '<b>' + element.title.substring(0, searchString.toString().length) + '</b>';
        element.title = bolder + element.title.substring(searchString.toString().length, element.title.length);
      });

      this.searchResults = results
    }, error => {
      if (error.status == 503) this.notifierService.notify('error', this.translateService.translate('TOO_MANY_REQUESTS'));
    });
  }
}