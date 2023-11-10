import { Component, OnInit } from '@angular/core';

import { ScrollbarService } from './core/scrollbar.service';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
})
export class AppComponent implements OnInit {
  title = 'pali-web';

  constructor(private _scrollbarService: ScrollbarService) {}

  ngOnInit(): void {
    this._scrollbarService.showScrollbar();
  }
}
