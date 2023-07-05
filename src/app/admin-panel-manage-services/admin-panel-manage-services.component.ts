import { Component } from '@angular/core';
import { Service } from '../model/service';
import { FormGroup } from '@angular/forms';
import { QuillModules, defaultModules } from 'ngx-quill';
import { imageHandler } from '../quill/handlers/imageHandler';

@Component({
  selector: 'app-admin-panel-manage-services',
  templateUrl: './admin-panel-manage-services.component.html',
  styleUrls: ['./admin-panel-manage-services.component.css']
})
export class AdminPanelManageServicesComponent {
  viewServiceModalShown : boolean;
  newServiceModalShown : boolean;
  editServiceModalShown : boolean;
  confirmDeleteModalShown : boolean;
  successModalShown : boolean;
  failModalShown : boolean;

  successMessage : string;

  services : Service[]
  newServiceForm : FormGroup;
  editServiceForm : FormGroup;
  currentServiceEdited? : Service;
  serviceToDelete? : Service;

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

  viewService(service : Service) {}
  canEdit(service : Service) {}
  canDelete(service : Service) {}
  showEditModal(id : number) {}
  showServiceDeleteModal(service : Service) {}
  submitNewService(browseLabel : HTMLLabelElement) {}
  uploadFile(event: Event, targetForm : FormGroup, browseLabel : HTMLLabelElement) {}
  closeAllModals() {}
  submitEditedService() {}
  deleteService() {}
}
