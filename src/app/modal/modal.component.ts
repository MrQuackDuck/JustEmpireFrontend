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

  scrollY : number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal'] && changes['showModal'].currentValue === true) {
      this.onShowModal();
    }
  }

  onShowModal() {
    document.body.style.top = `-${window.scrollY}px`;
    this.scrollY = +document.body.style.top.slice(0, -2);
    console.log(this.scrollY);
    this.renderer.addClass(document.body, 'disable-scroll');
  }

  close() {
    this.renderer.removeClass(document.body, 'disable-scroll');
    this.onClose.emit(false);
    
    const body = document.body;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, -this.scrollY);
  }
}