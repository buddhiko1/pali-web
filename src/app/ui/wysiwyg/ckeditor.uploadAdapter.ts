import { createDirectus, staticToken, rest, uploadFiles } from '@directus/sdk';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {
  FileLoader,
  UploadResponse,
  UploadAdapter,
} from '@ckeditor/ckeditor5-upload';

import { environment } from 'src/environments/environment';
import { StorageService } from '../../shared/services/storage.service';
import { UtilitiesService } from '../../shared/services/utilities.service';
import { UrlService } from '../../shared/services/url.service';

class CustomUploadAdapter implements UploadAdapter {
  loader: FileLoader;

  constructor(loader: FileLoader) {
    this.loader = loader;
  }

  async upload(): Promise<UploadResponse> {
    return this.loader.file.then(
      (file: File | null) =>
        new Promise((resolve, reject) => {
          if (!file) {
            return reject('File not found');
          }
          const storageService = new StorageService();
          const urlService = new UrlService();
          const client = createDirectus(environment.cms)
            .with(staticToken(storageService.tokenForAccess))
            .with(rest());
          const formData = new FormData();
          formData.append('folder', storageService.wysiwygFolderId);
          const fileExtension = file.name
            .substring(file.name.lastIndexOf('.'))
            .toLowerCase();

          if (['.jpg', '.jpeg', '.png'].includes(fileExtension)) {
            const utilitiesService = new UtilitiesService();
            utilitiesService.convertImageToWebp(file, 0.8).then((blob) => {
              formData.append('file', blob);
              client.request(uploadFiles(formData)).then((result) => {
                resolve({
                  default: urlService.fileUrlFor(result['filename_disk']),
                });
              });
            });
          } else {
            formData.append('file', file);
            client.request(uploadFiles(formData)).then((result) => {
              resolve({
                default: urlService.fileUrlFor(result['filename_disk']),
              });
            });
          }
        }),
    );
  }

  abort() {}
}

export function UploadAdapterPlugin(editor: Editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new CustomUploadAdapter(loader);
  };
}
