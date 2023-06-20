import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminSelectedTabService {
  constructor() { }

  private _selectedTab : number = 0;
  private _totalTabcount : number = 4;

  public get selectedTab() {
    return this._selectedTab;
  }

  public set selectedTab(tab : number) {
    if (tab >= 0 && this._totalTabcount) {
      this._selectedTab = tab;
    }
  }
}
