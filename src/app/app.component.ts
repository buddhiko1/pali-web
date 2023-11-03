import { Component, OnInit  } from '@angular/core';

import { ScrollbarService } from './core/scrollbar.service';
import { ScrollDirective } from './core/scroll.directive';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  hostDirectives: [ScrollDirective],
})
export class AppComponent implements OnInit {
  title = 'pali-web';

  constructor(
    private _appService: AppService,
    private _scrollbarService: ScrollbarService
  ) {
  }

  ngOnInit(): void {
    this._scrollbarService.showScrollbar();
  }

  get isMaskBg(): boolean {
    return this._appService.isMaskBg;
  }
}
