import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { ScrollbarService } from './core/scrollbar.service';
import { ScrollDirective } from './core/global-scroll.directive';
import { RouteAnimation } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [RouteAnimation],
  hostDirectives: [ScrollDirective],
})
export class AppComponent implements OnInit {
  title = 'pali-web';

  constructor(
    private _contexts: ChildrenOutletContexts,
    private _scrollbarService: ScrollbarService
  ) {}

  ngOnInit(): void {
    this._scrollbarService.showScrollbar();
  }

  getRouteAnimationData() {
    return this._contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
