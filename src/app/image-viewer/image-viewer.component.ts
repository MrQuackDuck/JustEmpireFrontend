import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ServiceImage } from '../model/serviceImage';
import { API_URL } from 'src/globals';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnChanges {
  constructor(private scrollService : ScrollService) { }

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

  ngOnInit() {
    window.addEventListener("wheel", event => {
      if (event.ctrlKey) return;
      if (event.deltaY > 0) this.nextImage();
      if (event.deltaY < 0) this.previousImage();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['shown'] && changes['shown'].currentValue === true) {
      this.onShowModal();
    }
  }

  onShowModal() {
    this.scrollService.disableScrolling();
  }

  close() {
    this.onClose.emit();
    this.scrollService.enableScrolling();
  }

  previousImage() {
    if (this.selectedImageIndex - 1 >= 0)
      this.imageChanged(this.selectedImageIndex - 1)
  }

  nextImage() {
    if (this.selectedImageIndex + 1 < this.images?.length!) 
      this.imageChanged(this.selectedImageIndex + 1)
  }

  imageChanged(index) {
    this.onImageChanged.emit(index)
  }
}
