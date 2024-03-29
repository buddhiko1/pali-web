import {
  Component,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { LoaderComponent } from 'src/app/ui/loader/loader.component';
import { UtilitiesService } from '../shared/services/utilities.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UploaderService } from './uploader.service';

@Component({
  selector: 'app-uploader',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.css',
})
export class UploaderComponent implements AfterViewInit {
  @Input() folderId = '';
  @Input() allowedExtensions!: string[];
  @Input() maxSize = 4; // 1MB
  @Input() enableMultiFiles = false;
  @Input() enableImageConversion = true;
  @Input() webpQuality = 0.8;
  @Output() successful = new EventEmitter<string>();
  @Output() failed = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  isLoading = false;
  error = '';

  constructor(
    private _uploaderService: UploaderService,
    private _utilitiesService: UtilitiesService,
    private _notificationService: NotificationsService,
  ) {}

  ngAfterViewInit(): void {
    this.fileInput.nativeElement.click();
  }

  private async _extractInputFiles(
    fileInput: HTMLInputElement,
  ): Promise<(File | Blob)[]> {
    const files: (File | Blob)[] = [];
    if (fileInput.files) {
      // valide files
      if (!this.enableMultiFiles && fileInput.files.length > 1) {
        throw Error(`Only one file allowed.`);
      }
      let error = '';
      for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];
        const fileExtension = file.name
          .substring(file.name.lastIndexOf('.'))
          .toLowerCase();
        if (!this.allowedExtensions.includes(fileExtension)) {
          error = `Invalid file type, allowed file extensions: ${this.allowedExtensions.join(
            ' ',
          )}.`;
        } else if (file.size > this.maxSize * 1024 * 1024) {
          error = `File too large, max file size: ${this.maxSize}MB.`;
        }
        if (error) {
          throw Error(error);
        }

        // convert images
        if (
          this.enableImageConversion &&
          ['.jpg', '.jpeg', '.png'].includes(fileExtension)
        ) {
          const convertedFile = await this._utilitiesService.convertImageToWebp(
            file,
            this.webpQuality,
          );
          files.push(convertedFile);
        } else {
          files.push(file);
        }
      }
    }
    return files;
  }

  private async _uploadFile(file: File | Blob): Promise<string> {
    const formData = new FormData();
    if (this.folderId) {
      formData.append('folder', this.folderId);
    }
    formData.append('file', file);
    const uploadedFile = await this._uploaderService.upload(formData);
    return uploadedFile.id;
  }

  async onChanged(event: Event): Promise<void> {
    const fileInput = event.target as HTMLInputElement;
    try {
      this.isLoading = true;
      const files = await this._extractInputFiles(fileInput);
      const idListOfUploadedFiles = [];
      for (const file of files) {
        const fileId = await this._uploadFile(file);
        idListOfUploadedFiles.push(fileId);
      }
      this.successful.emit(
        this.enableMultiFiles
          ? idListOfUploadedFiles.join(',')
          : idListOfUploadedFiles[0],
      );
      this.isLoading = false;
    } catch (error: any) {
      this.isLoading = false;
      this._notificationService.pushErrorInfo({
        title: 'Upload Error',
        content: error.toString(),
      });
      this.failed.emit();
    }
  }

  onCanceled(): void {
    this.failed.emit();
  }
}
