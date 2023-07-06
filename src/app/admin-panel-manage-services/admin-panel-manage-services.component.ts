import { Component, Renderer2 } from '@angular/core';
import { Service } from '../model/service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuillModules, defaultModules } from 'ngx-quill';
import { imageHandler } from '../quill/handlers/imageHandler';
import { LoadingService } from '../services/loading.service';
import { ServiceRepositoryService } from '../services/service-repository.service';
import { AdminSelectedTabService } from '../services/admin-selected-tab.service';
import { AuthService } from '../services/auth.service';
import { Rank } from '../model/rank';
import { User } from '../model/user';
import { ServiceVersionRepositoryService } from '../services/service-version-repository.service';
import { Status } from '../enum/Status';
import { ServiceCategory } from '../model/serviceCategory';
import { ServiceCategoryRepositoryService } from '../services/service-category-repository.service';
import { API_URL } from 'src/globals';
import { ImageUploaderService } from '../services/image-uploader.service';
import { ServiceImageRepositoryService } from '../services/service-image-repository.service';
import { CreateImageModel } from '../model/createImageModel';

@Component({
  selector: 'app-admin-panel-manage-services',
  templateUrl: './admin-panel-manage-services.component.html',
  styleUrls: ['./admin-panel-manage-services.component.css']
})
export class AdminPanelManageServicesComponent {
  constructor(private loadingService : LoadingService, private serviceRepository : ServiceRepositoryService,
    private adminSelectedTab : AdminSelectedTabService, private authService : AuthService,
    private formBuilder : FormBuilder, private serviceVersionRepository : ServiceVersionRepositoryService,
    private serviceCategoryRepository : ServiceCategoryRepositoryService, private renderer : Renderer2,
    private imageUploader : ImageUploaderService, private serviceImageRepository : ServiceImageRepositoryService) {}

  currentRank : Rank;
  currentUser : User;

  currentViewedService : Service;
  viewServiceModalShown : boolean;
  newServiceModalShown : boolean;
  editServiceModalShown : boolean;
  confirmDeleteModalShown : boolean;
  successModalShown : boolean;
  failModalShown : boolean;

  API_URL = API_URL;

  successMessage : string;

  // When creating a service, these screenshots will be linked to service
  newServiceScreenshots : Screenshot[] = [];

  services : Service[]
  newServiceForm : FormGroup;
  editServiceForm : FormGroup;
  currentServiceEdited? : Service;
  serviceToDelete? : Service;

  categories : ServiceCategory[]

  quillModules: QuillModules = {
    toolbar: {
      container: defaultModules.toolbar, 
      handlers: {
        image: imageHandler
      }
    },
  };

  languages = [
    {key: '🇬🇧 English', value: 0},
    {key: '🇺🇦 Ukrainian', value: 1},
  ];

  async ngOnInit() {
    // Setting up input forms
    this.newServiceForm = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      titleImage: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required),
      isDownloadable: new FormControl(true, Validators.required),
      category: new FormControl(null, Validators.required),
      language : new FormControl(0, Validators.required)
    });

    this.editServiceForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      titleImage: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      language : new FormControl(0, Validators.required)
    });

    await this.updateData()

    this.adminSelectedTab.selectedTab = 2;

    this.authService.getCurrentRank().subscribe(rank => {
      this.currentRank = rank
      console.log(rank);
    })
    
    this.authService.getUser().subscribe(user => {
      this.currentUser = user
      console.log(user);
    })
  }

  viewService(service : Service) {
    this.currentViewedService = service;
    this.viewServiceModalShown = true;
  }
  
  showEditModal(id : number) {
    let targetService = this.services.find(article => article.id === id)
    if (targetService) {
      this.editServiceModalShown = true; // Show modal of article that being edited
      this.currentServiceEdited = targetService;

      this.editServiceForm.controls['id'].setValue(targetService.id);
      this.editServiceForm.controls['title'].setValue(targetService.title);
      this.editServiceForm.controls['text'].setValue(targetService.text);
      this.editServiceForm.controls['language'].setValue(targetService.language);
      this.editServiceForm.controls['titleImage'].setValue(targetService.titleImage);
      
      let label : any = document.querySelector('.upload-photo-label-edit')
      label.innerHTML = `<img src='${API_URL}/uploads/${targetService.titleImage}'>`;
    }
  }
  
  showServiceDeleteModal(service : Service) {
    this.serviceToDelete = service;
    this.confirmDeleteModalShown = true;
  }

  submitNewService(browseLabel : HTMLLabelElement) {
    if (!this.newServiceForm.valid) {
      return; 
    }

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.serviceRepository.create(this.newServiceForm.getRawValue()).subscribe(
      success => {
        this.newServiceScreenshots.forEach(screenshot => {
          let model : CreateImageModel = new CreateImageModel();
          model.image = screenshot.screenshot;
          model.serviceId = success.id;
          this.serviceImageRepository.create(model).subscribe();
        });

        this.loadingService.disableLoading();
        this.successModalShown = true;
        this.updateData();
        browseLabel.innerHTML = "<span>Browse</span>";
        this.newServiceForm.reset();
        this.newServiceForm.markAsPristine();
        this.newServiceForm.markAsUntouched();
        this.newServiceScreenshots = [];
      },
      fail => {
        this.loadingService.disableLoading();
        this.failModalShown = true;
      });
  }

  uploadFile(event: Event, targetForm : FormGroup, browseLabel : HTMLLabelElement) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let file : File = fileList[0];
      this.imageUploader.uploadImage(file).subscribe(file => {
        let filename = file.filename;
        browseLabel.innerHTML = `<img src='${API_URL}/uploads/${filename}'>`;
        try 
        {
          targetForm.controls['titleImage'].setValue(filename);
        } 
        catch { }
      });
    }
  }

  uploadScreenshot(event: Event, targetArray : Screenshot[], index : number) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let file : File = fileList[0];
      this.imageUploader.uploadImage(file).subscribe(file => {
        let filename = file.filename;
        let scr : Screenshot = new Screenshot();
        scr.labelIndex = index;
        scr.screenshot = filename;
        targetArray.push(scr);
      });
    }
  }

  submitEditedService() {}
  deleteService() {}

  canEdit(service : Service) : [boolean, string] {
    if (service.status != Status.POSTED) {
      return [false, "You can't edit pending service"];
    }

    // If user is author of the service and he has permission to delete own postable
    if (service.authorId == this.currentUser.id && this.currentRank.editPostableOwn)
    {
      return [true, ""];
    }
    // If user is not author of the service and he has permission to delete others postable
    else if (service.authorId != this.currentUser.id && this.currentRank.editPostableOthers)
    {
      return [true, ""];
    }

    return [false, "You don't have enough permissions"];
  }

  canDelete(service : Service) : [boolean, string] {
    if (service.status != Status.POSTED) {
      return [false, "You can't delete unpublished service"];
    }
    
    let target = this.services.find(s => s.originalId == service.id)
    if (target) {
      return [false, `Service ID ${target.id} is pending for action`];
    }

    // If user is author of the service and he has permission to delete own postable
    if (service.authorId == this.currentUser.id && this.currentRank.deletePostableOwn)
    {
      return [true, ""];
    }
    // If user is not author of the service and he has permission to delete others postable
    else if (service.authorId != this.currentUser.id && this.currentRank.deletePostableOthers)
    {
      return [true, ""];
    }

    return [false, "You don't have enough permissions"];
  }

  updateData() {
    this.loadingService.enableLoading();
    
    this.serviceCategoryRepository.getAllStaff().subscribe(categories => {
      this.categories = categories;
      this.newServiceForm.controls["category"].setValue(categories[0].id)

      this.serviceRepository.getAllStaff().subscribe(services => {
        this.services = services;
        this.loadingService.disableLoading();
      });
    })
  }

  closeAllModals() {
    this.renderer.removeClass(document.body, 'disable-scroll');
    this.viewServiceModalShown = false;
    this.newServiceModalShown = false;
    this.editServiceModalShown = false;
    this.confirmDeleteModalShown = false;
    this.successModalShown = false;
    this.failModalShown = false;
  }

  range(number){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
}

class Screenshot {
  labelIndex
  screenshot
}