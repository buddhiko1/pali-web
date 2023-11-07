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

import {
  StatusEnum as LoaderStatusEnum,
  LoaderComponent,
} from '../loader/loader.component';
import { OverlayComponent } from '../overlay/overlay.component';
import { UploaderService } from './uploader.service';

@Component({
  selector: 'app-uploader',
  standalone: true,
  imports: [CommonModule, LoaderComponent, OverlayComponent],
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css'],
})
export class UploaderComponent implements AfterViewInit {
  @Input() folderId = '';
  @Input() allowedExtensions!: string[];
  @Input() maxSize = 1; // 1MB
  @Input() multiFiles = false;
  @Output() successful = new EventEmitter<string>();
  @Output() failed = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

  constructor(private _uploaderService: UploaderService) {}

  ngAfterViewInit(): void {
    this.fileInput.nativeElement.click();
  }

  get isLoaderActived(): boolean {
    return this.loaderStatus !== LoaderStatusEnum.Idle;
  }

  async onChange(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      this.loaderStatus = LoaderStatusEnum.Loading;

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
      } else if (!this.multiFiles && event.target.files.length > 1) {
        validationError = `Only one file allowed.`;
      }

      if (validationError) {
        this.fileInput.nativeElement.value = '';
        this.loaderPrompt = validationError;
        this.loaderStatus = LoaderStatusEnum.Failed;
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
        this.loaderStatus = LoaderStatusEnum.Successful;
        this.successful.emit(uploadedFile.id);
      } catch (error: any) {
        this.loaderPrompt = error.toString();
        this.loaderStatus = LoaderStatusEnum.Failed;
      }
    }
  }

  onFailed(): void {
    this.failed.emit();
  }
}
