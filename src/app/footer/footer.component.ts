import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isVisible = false;

  constructor(private _el: ElementRef, private _router: Router) {}

  ngOnInit(): void {
    // ajsust footer position on every route change
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart');
        this.isVisible = false;
      }
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd');
        setTimeout(() => {
          this.adjustPosition();
          this.isVisible = true;
        }, 1500);
      }
    });
  }

  adjustPosition() {
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    console.log(`docHeight: ${docHeight}, windowHeight: ${windowHeight}`);
    if (docHeight <= windowHeight) {
      this._el.nativeElement.style.position = 'fixed';
      this._el.nativeElement.style.bottom = '0';
      this._el.nativeElement.style.width = '100%';
      console.log('fixed footer');
    } else {
      this._el.nativeElement.style.position = 'static';
      console.log('static footer');
    }
  }
}
