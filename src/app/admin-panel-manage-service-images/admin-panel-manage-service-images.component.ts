import { Component, Renderer2 } from '@angular/core';
import { ServiceImage } from '../model/serviceImage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from '../model/service';
import { User } from '../model/user';
import { Rank } from '../model/rank';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { ServiceImageRepositoryService } from '../services/service-image-repository.service';
import { AdminSelectedTabService } from '../services/admin-selected-tab.service';
import { ServiceVersion } from '../model/serviceVersion';
import { Status } from '../enum/Status';
import { ServiceRepositoryService } from '../services/service-repository.service';
import { API_URL } from 'src/globals';
import { ImageUploaderService } from '../services/image-uploader.service';

@Component({
  selector: 'app-admin-panel-manage-service-images',
  templateUrl: './admin-panel-manage-service-images.component.html',
  styleUrls: ['./admin-panel-manage-service-images.component.css']
})
export class AdminPanelManageServiceImagesComponent {
  constructor(private authService : AuthService, private loadingService : LoadingService, 
    private serviceImageRepository : ServiceImageRepositoryService,
    private adminSelectedTab : AdminSelectedTabService, private formBuilder : FormBuilder,
    private serviceRepository : ServiceRepositoryService, private renderer : Renderer2,
    private imageUploader : ImageUploaderService) { }

  API_URL = API_URL;

  allServices : Service[];

  newImageForm : FormGroup;

  editImageModalShown : boolean;
  editImageForm : FormGroup;

  confirmDeleteModalShown : boolean;

  imageToDelete? : ServiceImage;

  viewImageModalShown : boolean;

  currentViewedImage? : ServiceImage;

  currentImageEdited? : ServiceImage;

  newImageModalShown : boolean;
  serviceImages : ServiceImage[];

  successModalShown : boolean;
  successMessage : string = "";

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
    this.newImageForm = this.formBuilder.group({
      serviceId: new FormControl(null, Validators.required),
      image : new FormControl(null, Validators.required),
    });

    this.editImageForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      serviceId: new FormControl(null, Validators.required),
      image : new FormControl(null, Validators.required),
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
          targetForm.controls['image'].setValue(filename);
        } 
        catch { }
      });
    }
  }

  viewImage(version : ServiceImage) {
    this.viewImageModalShown = true; 
    this.currentViewedImage = version;
  }

  showEditModal(imageId : number) { 
    let targetImage = this.serviceImages.find(image => image.id === imageId)
    if (targetImage) {
      this.editImageModalShown = true; // Show modal of image that being edited
      this.currentImageEdited = targetImage;

      this.editImageForm.controls['id'].setValue(targetImage.id);
      this.editImageForm.controls['image'].setValue(targetImage.image);
      this.editImageForm.controls['serviceId'].setValue(targetImage.serviceId);

      let label : any = document.querySelector('.upload-photo-label-edit');
      label.innerHTML = `<img src='${API_URL}/uploads/${targetImage.image}'>`;
    }
  }
  
  showDeleteModal(image : ServiceImage) {
    this.imageToDelete = image;
    this.confirmDeleteModalShown = true;
  }

  submitNewImage() { 
    if (!this.newImageForm.valid) {
      return; 
    }

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.serviceImageRepository.create(this.newImageForm.getRawValue()).subscribe(
      success => {
        this.loadingService.disableLoading();
        this.successModalShown = true;
        this.updateData();
        this.newImageForm.reset();
        this.newImageForm.markAsPristine();
        this.newImageForm.markAsUntouched();

        let browseImageLabel : any = document.querySelector('.upload-photo-label'); 
        browseImageLabel.innerHTML = "<span>Browse</span>";
      },
      fail => {
        this.loadingService.disableLoading();
        this.failModalShown = true;
      });
  }

  submitEditedImage() { 
    if (!this.editImageForm.valid) {
      return; 
    }

    this.closeAllModals();
    this.loadingService.enableLoading();
    
    this.serviceImageRepository.edit(this.editImageForm.getRawValue()).subscribe(
      success => {
        this.loadingService.disableLoading();
        this.successModalShown = true;
        this.editImageForm.reset();
        this.updateData()
      },
      fail => {
        this.loadingService.disableLoading();
        this.failModalShown = true;
      });
  }

  deleteImage() { }
  
  canEdit(image : ServiceImage): [boolean, string] { 
    if (image.status != Status.POSTED) {
      return [false, "You can't edit pending image"];
    }

    // If user is author of the image and he has permission to delete own postable
    if (this.currentUser && image.authorId == this.currentUser.id && this.currentRank.editPostableOwn)
    {
      return [true, ""];
    }
    // If user is not author of the image and he has permission to delete others postable
    else if (this.currentUser && image.authorId != this.currentUser.id && this.currentRank.editPostableOthers)
    {
      return [true, ""];
    }

    return [false, "You don't have enough permissions"];
  }

  canDelete(image : ServiceImage): [boolean, string] { 
    if (image.status != Status.POSTED) {
      return [false, "You can't delete unpublished image"];
    }
    
    let target = this.serviceImages.find(a => a.originalId == image.id)
    if (target) {
      return [false, `Image ID ${target.id} is pending for action`];
    }

    // If user is author of the image and he has permission to delete own postable
    if (this.currentUser && image.authorId == this.currentUser.id && this.currentRank.deletePostableOwn)
    {
      return [true, ""];
    }
    // If user is not author of the image and he has permission to delete others postable
    else if (this.currentUser && image.authorId != this.currentUser.id && this.currentRank.deletePostableOthers)
    {
      return [true, ""];
    }

    return [false, "You don't have enough permissions"];
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

  closeAllModals() { 
    this.renderer.removeClass(document.body, 'disable-scroll');
    this.viewImageModalShown = false;
    this.newImageModalShown = false;
    this.editImageModalShown = false;
    this.confirmDeleteModalShown = false;
    this.successModalShown = false;
    this.failModalShown = false;
  }

  updateData() { 
    this.loadingService.enableLoading();
    this.serviceImageRepository.getAllStaff().subscribe((images) => {
      this.serviceRepository.getAllStaff().subscribe(services => {
        this.allServices = services;
        this.newImageForm.controls["serviceId"].setValue(services[0]?.id);
      });

      this.serviceImages = images;
      this.loadingService.disableLoading();
    });
  }
}
