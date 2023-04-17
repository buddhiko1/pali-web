import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(private _el: ElementRef) {}

  // TODO
  // adjustPosition() {
  //   const docHeight = document.documentElement.scrollHeight
  //   const windowHeight = window.innerHeight;
  //   console.log(`docHeight: ${docHeight}, windowHeight: ${windowHeight}`);
  //   if (docHeight < windowHeight) {
  //     this._el.nativeElement.style.position = 'fixed';
  //     this._el.nativeElement.style.bottom = '0';
  //     console.log('fixed footer');
  //   } else {
  //     this._el.nativeElement.style.position = 'static';
  //     console.log('static footer');
  //   }
  // }
}
