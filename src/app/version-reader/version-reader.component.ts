import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceVersion } from '../model/serviceVersion';

@Component({
  selector: 'app-version-reader',
  templateUrl: './version-reader.component.html',
  styleUrls: ['./version-reader.component.css']
})
export class VersionReaderComponent {
  @Input()
  version? : ServiceVersion;

  @Input()
  shown : boolean;

  @Output()
  onClose : EventEmitter<boolean> = new EventEmitter<boolean>();

  close() {
    this.onClose.emit(false);
  }
}
