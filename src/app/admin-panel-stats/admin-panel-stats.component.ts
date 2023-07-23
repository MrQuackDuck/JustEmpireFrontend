import { Component } from '@angular/core';
import { ViewsService } from '../services/views.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '../services/translate.service';
import { TitleService } from '../services/title-service.service';

@Component({
  selector: 'app-admin-panel-stats',
  templateUrl: './admin-panel-stats.component.html',
  styleUrls: ['./admin-panel-stats.component.css']
})
export class AdminPanelStatsComponent {
  constructor(private viewsService : ViewsService, private translateService : TranslateService,
    private titleService : TitleService) {}

  views24h : number;
  views7d : number;
  views1mo : number;
  views3mo : number;
  
  ngOnInit() {
    this.titleService.setTitle(this.translateService.translate('STATS'));
    
    this.viewsService.getViews(24).subscribe(data => this.views24h = data);
    this.viewsService.getViews(168).subscribe(data => this.views7d = data);
    this.viewsService.getViews(720).subscribe(data => this.views1mo = data);
    this.viewsService.getViews(2160).subscribe(data => this.views3mo = data);
  }
}
