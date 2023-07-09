import { Component, Renderer2 } from '@angular/core';
import { ServiceVersion } from '../model/serviceVersion';
import { ServiceVersionRepositoryService } from '../services/service-version-repository.service';
import { API_URL, LANGUAGES } from 'src/globals';
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
  
  currentUser? : User;
  currentRank : Rank;

  ngOnInit() {
    this.updateData()

    this.adminSelectedTab.selectedTab = 2;

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

  viewVersion(version : ServiceVersion) {
    this.viewVersionModalShown = true; 
    this.currentViewedVersion = version;
  }

  submitNewVersion() { 
    if (!this.newVersionForm.valid) {
      return; 
    }

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.serviceVersionRepository.create(this.newVersionForm.getRawValue()).subscribe(
      success => {
        this.loadingService.disableLoading();
        this.successModalShown = true;
        this.updateData();
        this.newVersionForm.reset();
        this.newVersionForm.markAsPristine();
        this.newVersionForm.markAsUntouched();
      },
      fail => {
        this.loadingService.disableLoading();
        this.failModalShown = true;
      });
  }

  submitEditedVersion() { 
    if (!this.editVersionForm.valid) {
      return; 
    }

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.serviceVersionRepository.edit(this.editVersionForm.getRawValue()).subscribe(
      success => {
        this.loadingService.disableLoading();
        this.successModalShown = true;
        this.updateData()
      },
      fail => {
        this.loadingService.disableLoading();
        this.failModalShown = true;
      });
  }
  
  deleteVersion() { 
    this.closeAllModals();
    this.loadingService.enableLoading();

    if (this.versionToDelete) {
      this.serviceVersionRepository.delete(this.versionToDelete.id).subscribe(
        success => {
          this.loadingService.disableLoading();
          this.successMessage = this.getSuccessDeleteMessage();
          this.successModalShown = true;
          this.updateData()
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

  canEdit(version : ServiceVersion) : [boolean, string] { 
    if (version.status != Status.POSTED) {
      return [false, "You can't edit pending version"];
    }

    // If user is author of the version and he has permission to delete own postable
    if (this.currentUser && version.authorId == this.currentUser.id && this.currentRank.editPostableOwn)
    {
      return [true, ""];
    }
    // If user is not author of the version and he has permission to delete others postable
    else if (this.currentUser && version.authorId != this.currentUser.id && this.currentRank.editPostableOthers)
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

    // If user is author of the image and he has permission to delete own postable
    if (this.currentUser && version.authorId == this.currentUser.id && this.currentRank.deletePostableOwn)
    {
      return [true, ""];
    }
    // If user is not author of the image and he has permission to delete others postable
    else if (this.currentUser && version.authorId != this.currentUser.id && this.currentRank.deletePostableOthers)
    {
      return [true, ""];
    }

    return [false, "You don't have enough permissions"];
  }

  showEditModal(id : number) {
    let targetVersion = this.serviceVersions.find(image => image.id === id)
    if (targetVersion) {
      this.editVersionModalShown = true; // Show modal of image that being edited
      this.currentVersionEdited = targetVersion;

      this.editVersionForm.controls['id'].setValue(targetVersion.id);
      this.editVersionForm.controls['title'].setValue(targetVersion.title);
      this.editVersionForm.controls['text'].setValue(targetVersion.text);
      this.editVersionForm.controls['serviceId'].setValue(targetVersion.serviceId);
    }
  }
  
  showDeleteModal(version : ServiceVersion) { 
    this.versionToDelete = version;
    this.confirmDeleteModalShown = true;
  }

  getSuccessDeleteMessage() : string {
    if (this.currentRank.approvementToDeletePostableOthers) 
    {
      return "Your image is now <b>pending to be deleted</b>. Emperor can approve this request or decline it";
    }
    else 
    {
      return "You have successfully deleted image!";
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
