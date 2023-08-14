import { Component, Renderer2 } from '@angular/core';
import { LANGUAGES } from 'src/globals';
import { User } from '../model/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Rank } from '../model/rank';
import { UserRepositoryService } from '../services/user-repository.service';
import { AdminSelectedTabService } from '../services/admin-selected-tab.service';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';
import { RankRepositoryService } from '../services/rank-repository.service';
import { TranslateService } from '../services/translate.service';
import { TitleService } from '../services/title-service.service';

@Component({
  selector: 'app-admin-panel-manage-users',
  templateUrl: './admin-panel-manage-users.component.html',
  styleUrls: ['./admin-panel-manage-users.component.css']
})
export class AdminPanelManageUsersComponent {
  constructor(private userRepository : UserRepositoryService, 
    private adminSelectedTab : AdminSelectedTabService, private authService : AuthService,
    private loadingService : LoadingService, private formBuilder : FormBuilder, 
    private router : Router, private renderer : Renderer2, private rankRepository : RankRepositoryService,
    private translateService : TranslateService, private titleService : TitleService) { }

  users : User[];
  ranks : Rank[];

  newUserModalShown : boolean;
  newUserForm : FormGroup;

  editUserForm : FormGroup;
  currentUserEdited? : User;
  editUserModalShown : boolean;

  confirmDeleteModalShown : boolean;
  userToDelete? : User;

  successModalShown : boolean;
  successMessage : string = "";

  value : any;

  failModalShown : boolean;

  currentUser? : User;
  currentRank? : Rank;

  ngOnInit() {
    this.titleService.setTitle(this.translateService.translate('MANAGE_USERS'));

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
      console.log(user);
    })

    // Setting up input forms
    this.newUserForm = this.formBuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      rankId: new FormControl(null, Validators.required),
    });

    this.editUserForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      rankId: new FormControl(null, Validators.required),
    }); 
  }

  showEditModal(userId : number) { 
    let targetUser = this.users.find(user => user.id === userId)
    if (targetUser) {
      this.editUserModalShown = true; // Show modal of user that being edited
      this.currentUserEdited = targetUser;

      this.editUserForm.controls['id'].setValue(targetUser.id);
      this.editUserForm.controls['username'].setValue(targetUser.username);
      this.editUserForm.controls['rankId'].setValue(targetUser.rankId);
    }
  }

  showDeleteModal(user : User) { 
    this.userToDelete = user;
    this.confirmDeleteModalShown = true;
  }

  submitNewUser() {
    this.successMessage = "";
    if (!this.newUserForm.valid) {
      return; 
    }

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.userRepository.create(this.newUserForm.getRawValue()).subscribe(
      success => {
        this.loadingService.disableLoading();
        this.successModalShown = true;
        this.updateData();
        this.newUserForm.reset();
        this.newUserForm.markAsPristine();
        this.newUserForm.markAsUntouched();
      },
      fail => {
        this.loadingService.disableLoading();
        this.failModalShown = true;
      });
  }

  submitEditedUser() { 
    this.successMessage = "";
    if (!this.editUserForm.valid) {
      return; 
    }

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.userRepository.edit(this.editUserForm.getRawValue()).subscribe(
      success => {
        this.loadingService.disableLoading();
        this.successModalShown = true;
        this.editUserForm.reset();
        this.updateData()
      },
      fail => {
        this.loadingService.disableLoading();
        this.failModalShown = true;
      });
  }

  deleteUser() {
    this.closeAllModals();
    this.loadingService.enableLoading();

    if (this.userToDelete) {
      this.userRepository.delete(this.userToDelete.id).subscribe(
        success => {
          this.loadingService.disableLoading();
          this.successMessage = this.getSuccessDeleteMessage();
          this.successModalShown = true;
          this.updateData()// 1920 / 2645
        },
        fail => {
          this.loadingService.disableLoading();
          this.failModalShown = true;
        });
    }
    else
    {
      this.loadingService.disableLoading();
      this.failModalShown = true;
    }
  }

  canDelete(user : User): [boolean, string] {
    if (user.id == this.currentUser?.id)
    {
      return [false, this.translateService.translate("CANNOT_DELETE_YOURSELF")];
    }

    return [true, ""];
  }

  updateData() {
    this.loadingService.enableLoading();
    this.userRepository.getAllStaff().subscribe(users => {
      this.users = users;

      this.rankRepository.getAllStaff().subscribe(ranks => {
        this.ranks = ranks;
        this.loadingService.disableLoading();
      })
    });
  }

  getSuccessDeleteMessage() {
    return this.translateService.translate('SUCCESSFULLY_DELETED_USER');
  }

  closeAllModals() { 
    this.renderer.removeClass(document.body, 'disable-scroll');
    this.newUserModalShown = false;
    this.editUserModalShown = false;
    this.confirmDeleteModalShown = false;
    this.successModalShown = false;
    this.failModalShown = false;
  }
}
