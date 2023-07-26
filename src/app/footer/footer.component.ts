import { Component } from '@angular/core';
import { Language } from '../enum/Language';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(public languageService : LanguageService) { }

  currentLanguage : any;

  ngOnInit() {
    this.currentLanguage = this.languageService.getLanguage()
  }

  addTriangle() : void {
    let triangle = document.querySelector('.triangle');
    triangle?.classList.add("triangle-active");
  }

  removeTriangle() : void {
    let triangle = document.querySelector('.triangle');
    triangle?.classList.remove("triangle-active");
  }

  setLanguage(language : Language) {
    this.languageService.setLanguage(language);
  }
}