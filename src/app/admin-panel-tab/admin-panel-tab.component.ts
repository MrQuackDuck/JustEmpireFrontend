import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-panel-tab',
  templateUrl: './admin-panel-tab.component.html',
  styleUrls: ['./admin-panel-tab.component.css']
})
export class AdminPanelTabComponent {
  @Input()
  title : string;

  @Input()
  grayText;

  @Input()
  icon : string;
}
