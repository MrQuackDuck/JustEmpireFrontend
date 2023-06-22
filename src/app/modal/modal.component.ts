import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input()
  showModal : boolean = false;

  @Output()
  onClose : EventEmitter<boolean> = new EventEmitter<boolean>();

  close() {
    this.onClose.emit(false);
  }
}
