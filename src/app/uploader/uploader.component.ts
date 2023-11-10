import {
  Component,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from '../loader/loader.component';
import { OverlayComponent } from '../overlay/overlay.component';
import { UploaderService } from './uploader.service';

@Component({
  selector: 'app-uploader',
  standalone: true,
  imports: [CommonModule, LoaderComponent, OverlayComponent],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.css',
})
export class UploaderComponent implements AfterViewInit {
  @Input() folderId = '';
  @Input() allowedExtensions!: string[];
  @Input() maxSize = 1; // 1MB
  @Input() multiFiles = false;
  @Output() successful = new EventEmitter<string>();
  @Output() failed = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef;
  showLoader = false;
  errorInfo = '';
  successInfo = '';

  constructor(private _uploaderService: UploaderService) {}

  ngAfterViewInit(): void {
    this.fileInput.nativeElement.click();
  }

  async onChanged(event: Event): Promise<void> {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      this.showLoader = true;

      const file = fileInput.files[0];
      const fileName = this.fileInput.nativeElement.value;
      const fileExtension = fileName
        .substring(fileName.lastIndexOf('.'))
        .toLowerCase();
      let validationError = '';
      if (!this.allowedExtensions.includes(fileExtension)) {
        validationError = `Invalid file type, allowed file extensions: ${this.allowedExtensions.join(
          ' ',
        )}.`;
      } else if (file.size > this.maxSize * 1024 * 1024) {
        validationError = `File too large, max file size: ${this.maxSize}MB.`;
      } else if (!this.multiFiles && fileInput.files.length > 1) {
        validationError = `Only one file allowed.`;
      }

      if (validationError) {
        this.fileInput.nativeElement.value = '';
        this.errorInfo = validationError;
        return;
      }

      // upload file
      const formData = new FormData();
      if (this.folderId) {
        formData.append('folder', this.folderId);
      }
      formData.append('file', file);
      try {
        const uploadedFile = await this._uploaderService.upload(formData);
        this.showLoader = false;
        this.successful.emit(uploadedFile.id);
      } catch (error) {
        //TODO set useful error message.
        this.errorInfo = 'Failed to upload file.';
      }
    }
  }

  onActionDone(): void {
    this.failed.emit();
  }
  onCanceled(): void {
    this.failed.emit();
  }
}
