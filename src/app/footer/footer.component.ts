import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  addTriangle() : void {
    let triangle = document.querySelector('.triangle');
    triangle?.classList.add("triangle-active");
  }

  removeTriangle() : void {
    let triangle = document.querySelector('.triangle');
    triangle?.classList.remove("triangle-active");
  }
}