import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

@Component({
  selector: 'modal-window',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnChanges {
  constructor(private renderer: Renderer2) { }

  @Input()
  showModal: boolean = false;

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal'] && changes['showModal'].currentValue === true) {
      this.onShowModal();
    }
  }

  onShowModal() {
    this.renderer.addClass(document.body, 'disable-scroll');
  }

  close() {
    this.renderer.removeClass(document.body, 'disable-scroll');
    this.onClose.emit(false);
  }
}