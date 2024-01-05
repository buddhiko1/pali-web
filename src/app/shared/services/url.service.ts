import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  fileUrlFor(filename: string | null | undefined): string {
    return filename ? `${environment.fileServer}/${filename}` : '';
  }

  downloadUrlFor(filename: string | null | undefined): string {
    return filename ? this.fileUrlFor(filename) + '?download' : '';
  }
}
