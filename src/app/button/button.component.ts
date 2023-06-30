import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input()
  color : string = "";

  @Input()
  disabled : boolean;

  @Input()
  small : boolean;

  @Input()
  href : string;

  @Input()
  paddingLeft : number;

  @Input()
  paddingRight : number;

  allowedColors : string[] = ['red', 'orange', 'gray', 'green']

  paddings : any = {};

  ngOnInit() {
    if (this.paddingLeft >= 0) {
      this.paddings['padding-left'] = `${this.paddingLeft}px`;
    }
    
    if (this.paddingRight >= 0) {
      this.paddings['padding-right'] = `${this.paddingRight}px`;
    }

    if (this.allowedColors.find(color => color == this.color) != undefined) {
      return;
    }

    this.color = "";
  }
}
