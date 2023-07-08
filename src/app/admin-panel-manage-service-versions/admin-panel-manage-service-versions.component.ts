import { Component, Renderer2 } from '@angular/core';
import { ServiceVersion } from '../model/serviceVersion';
import { ServiceVersionRepositoryService } from '../services/service-version-repository.service';
import { LANGUAGES } from 'src/globals';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { Rank } from '../model/rank';
import { AuthService } from '../services/auth.service';
import { Status } from '../enum/Status';
import { QuillModules, defaultModules } from 'ngx-quill';
import { imageHandler } from '../quill/handlers/imageHandler';
import { AdminSelectedTabService } from '../services/admin-selected-tab.service';
import { LoadingService } from '../services/loading.service';
import { Service } from '../model/service';
import { ServiceRepositoryService } from '../services/service-repository.service';

@Component({
  selector: 'app-admin-panel-manage-service-versions',
  templateUrl: './admin-panel-manage-service-versions.component.html',
  styleUrls: ['./admin-panel-manage-service-versions.component.css']
})
export class AdminPanelManageServiceVersionsComponent {
  constructor(private serviceVersionRepository : ServiceVersionRepositoryService ,
    private renderer : Renderer2, private authService : AuthService, 
    private adminSelectedTab : AdminSelectedTabService, private loadingService : LoadingService,
    private formBuilder : FormBuilder, private serviceRepository : ServiceRepositoryService) { }

    quillModules: QuillModules = {
      toolbar: {
        container: defaultModules.toolbar, 
        handlers: {
          image: imageHandler
        }
      },
    };

  allServices : Service[];

  currentViewedVersion? : ServiceVersion;
  viewVersionModalShown : boolean;

  newVersionForm : FormGroup;
  newVersionModalShown : boolean;

  editVersionForm : FormGroup;
  currentVersionEdited? : ServiceVersion;
  editVersionModalShown : boolean;

  serviceVersions : ServiceVersion[];

  successModalShown : boolean;
  successMessage : string = "";

  versionToDelete? : ServiceVersion;
  confirmDeleteModalShown : boolean;

  failModalShown : boolean;

  languages = LANGUAGES;

  currentUser : User;
  currentRank : Rank;

  ngOnInit() {
    this.updateData()

    this.adminSelectedTab.selectedTab = 1;

    this.authService.getCurrentRank().subscribe(rank => {
      this.currentRank = rank
      console.log(rank);
    })
    
    this.authService.getUser().subscribe(user => {
      this.currentUser = user
      console.log(user);
    })

    // Setting up input forms
    this.newVersionForm = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      serviceId: new FormControl(null, Validators.required),
      language : new FormControl(0, Validators.required)
    });

    this.editVersionForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      serviceId: new FormControl(null, Validators.required),
      language : new FormControl(0, Validators.required)
    });
  }

  viewVersion(version : ServiceVersion) { }

  submitNewVersion() { }

  submitEditedVersion() { }
  
  deleteVersion() { }

  canEdit(version : ServiceVersion) : [boolean, string] { 
    if (version.status != Status.POSTED) {
      return [false, "You can't edit pending version"];
    }

    // If user is author of the category and he has permission to delete own postable
    if (version.authorId == this.currentUser.id && this.currentRank.editPostableOwn)
    {
      return [true, ""];
    }
    // If user is not author of the category and he has permission to delete others postable
    else if (version.authorId != this.currentUser.id && this.currentRank.editPostableOthers)
    {
      return [true, ""];
    }

    return [false, "You don't have enough permissions"];
  }

  canDelete(version : ServiceVersion) : [boolean, string] { 
    if (version.status != Status.POSTED) {
      return [false, "You can't delete unpublished version"];
    }
    
    let target = this.serviceVersions.find(a => a.originalId == version.id)
    if (target) {
      return [false, `Version ID ${target.id} is pending for action`];
    }

    // If user is author of the article and he has permission to delete own postable
    if (version.authorId == this.currentUser.id && this.currentRank.deletePostableOwn)
    {
      return [true, ""];
    }
    // If user is not author of the article and he has permission to delete others postable
    else if (version.authorId != this.currentUser.id && this.currentRank.deletePostableOthers)
    {
      return [true, ""];
    }

    return [false, "You don't have enough permissions"];
  }

  showEditModal(id : number) {}
  showDeleteModal(version : ServiceVersion) { }

  getSuccessDeleteMessage() : string {
    if (this.currentRank.approvementToDeletePostableOthers) 
    {
      return "Your category is now <b>pending to be deleted</b>. Emperor can approve this request or decline it";
    }
    else 
    {
      return "You have successfully deleted category!";
    }
  }

  updateData() {
    this.loadingService.enableLoading();
    this.serviceVersionRepository.getAllStaff().subscribe((versions) => {
      this.serviceRepository.getAllStaff().subscribe(services => {
        this.allServices = services;
        this.newVersionForm.controls["serviceId"].setValue(services[0]?.id);
      });

      this.serviceVersions = versions;
      this.loadingService.disableLoading();
    });
  }
  
  closeAllModals() {
    this.renderer.removeClass(document.body, 'disable-scroll');
    this.viewVersionModalShown = false;
    this.newVersionModalShown = false;
    this.editVersionModalShown = false;
    this.confirmDeleteModalShown = false;
    this.successModalShown = false;
    this.failModalShown = false;
  }
}
