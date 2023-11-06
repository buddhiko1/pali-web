import { Component, OnInit } from '@angular/core';

import { ScrollbarService } from './core/scrollbar.service';
import { ScrollDirective } from './core/scroll.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  hostDirectives: [ScrollDirective],
})
export class AppComponent implements OnInit {
  title = 'pali-web';

  constructor(private _scrollbarService: ScrollbarService) {}

  ngOnInit(): void {
    this._scrollbarService.showScrollbar();
  }
}
