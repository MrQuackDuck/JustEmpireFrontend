import { Component, Renderer2 } from '@angular/core';
import { ApprovementsService } from '../services/approvements.service';
import { Postable } from '../model/postable';
import { LoadingService } from '../services/loading.service';
import { AdminSelectedTabService } from '../services/admin-selected-tab.service';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { Rank } from '../model/rank';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel-manage-approvements',
  templateUrl: './admin-panel-manage-approvements.component.html',
  styleUrls: ['./admin-panel-manage-approvements.component.css']
})
export class AdminPanelManageApprovementsComponent {
  constructor(private approvementsRepository : ApprovementsService, 
    private loadingService : LoadingService, private renderer : Renderer2, 
    private adminSelectedTab : AdminSelectedTabService, private authService : AuthService,
    private router : Router) { }

  approvements : Postable[] = [];

  successModalShown : boolean;
  successMessage : string = "";

  failModalShown : boolean;

  currentUser? : User;
  currentRank? : Rank;

  ngOnInit() {
    this.updateData()

    this.adminSelectedTab.selectedTab = 3;

    this.authService.getCurrentRank().subscribe(rank => {
      this.currentRank = rank
      if (this.currentRank.name.toLowerCase() != "emperor") {
        this.router.navigate(["/admin"]);
        this.adminSelectedTab.selectedTab = 0;
        return;
      }
    })
    
    this.authService.getUser().subscribe(user => {
      this.currentUser = user
    })
  }

  closeAllModals() {
    this.renderer.removeClass(document.body, 'disable-scroll');
    this.successModalShown = false;
    this.failModalShown = false;
  }

  updateData() { 
    this.loadingService.enableLoading();
    this.approvementsRepository.getAll().subscribe((approvements) => {
      this.approvements = approvements.sort();
      this.loadingService.disableLoading();
    });
  }
}
