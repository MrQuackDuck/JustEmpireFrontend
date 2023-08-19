import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { TitleService } from '../services/title-service.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {
  constructor(private loadingService : LoadingService, private titleService : TitleService, private translateService : TranslateService) { }

  ngOnInit() {
    this.titleService.setTitle(this.translateService.translate('OUR_POLICY'));
    this.loadingService.disableLoading();
    window.scrollTo(0, 0);
  }
}
