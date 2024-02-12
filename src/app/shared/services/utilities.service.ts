import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  // convert .jpg .png to .webp
  convertImageToWebp(file: File, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function () {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob);
                } else {
                  reject('Failed to create blob.');
                }
              },
              'image/webp',
              quality,
            );
          } else {
            reject('Failed to create canvas.');
          }
        };
        img.onerror = () => {
          reject('Failed to load image.');
        };
        if (reader.result) {
          img.src = reader.result.toString();
        } else {
          reject('Failed to load image.');
        }
      };
      reader.readAsDataURL(file);
    });
  }

  downloadFile(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.setAttribute('download', filename);
    link.click();
    document.body.removeChild(link);
  }

  openNewTab(url: string): void {
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.focus();
    }
  }

  generateRandomAlais() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const alaisLength = 8;
    let alais = '';
    for (let i = 0; i < alaisLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      alais += characters.charAt(randomIndex);
    }
    return alais;
  }
}
