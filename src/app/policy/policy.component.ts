import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {
  constructor(private loadingService : LoadingService) { }

  ngOnInit() {
    this.loadingService.disableLoading();
  }
}
