import { Component, OnInit } from '@angular/core';

import { ScrollbarService } from './core/scrollbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pali-web';

  constructor(private _scrollbarService: ScrollbarService) {}

  ngOnInit(): void {
    this._scrollbarService.showScrollbar();
  }
}
