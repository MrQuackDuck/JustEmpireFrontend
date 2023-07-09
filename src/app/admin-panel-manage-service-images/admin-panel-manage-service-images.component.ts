import { Component } from '@angular/core';
import { ServiceImage } from '../model/serviceImage';
import { FormGroup } from '@angular/forms';
import { Service } from '../model/service';

@Component({
  selector: 'app-admin-panel-manage-service-images',
  templateUrl: './admin-panel-manage-service-images.component.html',
  styleUrls: ['./admin-panel-manage-service-images.component.css']
})
export class AdminPanelManageServiceImagesComponent {
  constructor() { }

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

  ngOnInit() { 
    
  }

  viewImage(image : ServiceImage) { }

  showEditModal(imageId : number) { }
  showDeleteModal(image : ServiceImage) { }

  submitNewImage() { }

  submitEditedImage() { }

  deleteImage() { }
  
  canEdit(image : ServiceImage): [boolean, string] { 
    return [false, ""];
  }

  canDelete(image : ServiceImage): [boolean, string] { 
    return [false, ""];
  }

  closeAllModals() { }

  updateData() { }
}
