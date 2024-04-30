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
  constructor(public language : LanguageService, private searchService : SearchService, 
  private notifierService : NotifierService, private translateService : TranslateService, 
  public router : Router, private languageService : LanguageService) { }

  currentLanguage : any;

  availableLanguages = [
    { index: 0, value: 'English' },
    { index: 1, value: 'Ukrainian' }
  ]

  blockSearchInput : boolean;

  // Search icon | Cross icon
  currentIcon = "../../assets/images/svg/header/search.svg";

  showOtherlanguages = false;

  ngOnInit() {
    this.currentLanguage = this.languageService.getLanguage();
  }

  preventContextMenu() {
    return false;
  }

  setLanguage(lang) {
    this.languageService.setLanguage(lang);
  }

  toggleSearch() : void {
    let nav = document.querySelector(".nav")
    nav?.classList.toggle("openSearch");
    nav?.classList.remove("openNav");
    if (nav?.classList.contains("openSearch")) {
        this.currentIcon = "../../assets/images/svg/header/close.svg";
        this.blockSearchInput = false;
        return;
    }

    this.blockSearchInput = true;
    this.currentIcon = "../../assets/images/svg/header/search.svg";
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
    
    this.currentIcon = "../../assets/images/svg/header/search.svg";
  }

  openNav() : void {
    let nav = document.querySelector(".nav")
    nav?.classList.add("openNav");
    nav?.classList.remove("openSearch");
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
    if (event.target.className == "current") return;
    if (event.target.className == "currentLanguage") return;
    
    this.closeNav();
    this.disableSearch();
  }

  searchResults : SearchPostable[] = [];

  boldString(str, find) {
    var reg = new RegExp('('+find+')', 'gi');
    return str.replace(reg, '<b>$1</b>');
  }

  removeTags(str : string) : string {
    str = str.replace(/<[^>]*>?/gm, '');

    return str;
  }

  cutOffString(str : string, target : string) : string {
    let targetIndex = str.toLowerCase().indexOf(target.toLowerCase());

    let maxStringLength = 70;

    if (targetIndex >= maxStringLength)
      str = '...' + str.substring(targetIndex - maxStringLength / 2, targetIndex + maxStringLength / 2) + '...';
    else
      str = str.substring(0, targetIndex + target.length + (maxStringLength - (targetIndex + target.length))) + '...';

    if (str == "...") return "";
    return str;
  }

  findAndShowResults() {
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

        element.title = this.boldString(element.title, searchString);
        element.text = this.removeTags(element.text);
        element.text = this.cutOffString(element.text, searchString)
        element.text = this.boldString(element.text, searchString);
      });

      this.searchResults = results
    }, error => {
      if (error.status == 503) this.notifierService.notify('error', this.translateService.translate('TOO_MANY_REQUESTS'));
    });
  }
}