import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceImage } from '../model/serviceImage';
import { API_URL } from 'src/globals';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {
  API_URL = API_URL;

  @Input()
  selectedImageIndex : number = 0;

  @Input()
  shown : boolean = false;

  @Input()
  images? : ServiceImage[];

  @Output()
  onClose = new EventEmitter<boolean>();

  @Output()
  onImageChanged = new EventEmitter<number>();

  close() {
    this.onClose.emit();
  }

  imageChanged(index) {
    this.onImageChanged.emit(index)
  }
}
