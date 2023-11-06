import {
  Component,
  Input,
  EventEmitter,
  Output,
  ElementRef,
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
  @Output() successful = new EventEmitter<string>();

  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

  constructor(
    private _uploaderService: UploaderService,
    private _el: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    this._el.nativeElement.querySelector('#fileInput').click();
  }

  get isLoaderActived(): boolean {
    return this.loaderStatus !== LoaderStatusEnum.Idle;
  }

  async onSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      this.activeLoader();

      const formData = new FormData();
      if (this.folderId) {
        formData.append('folder', this.folderId);
      }
      formData.append('file', file);
      try {
        const uploadedFile = await this._uploaderService.upload(formData);
        this.successful.emit(uploadedFile.id);
        setTimeout(() => {
          this.deactiveLoader();
        }, 10000);
      } catch (error: any) {
        this.loaderStatus = LoaderStatusEnum.Failed;
        this.loaderPrompt = error.toString();
      }
    }
  }

  activeLoader(): void {
    this.loaderStatus = LoaderStatusEnum.Loading;
  }

  deactiveLoader(): void {
    this.loaderStatus = LoaderStatusEnum.Idle;
  }
}
