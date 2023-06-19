import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
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
}