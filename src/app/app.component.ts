import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { PublicService } from './core/public.service';
import { ScrollDirective } from './core/global-scroll.directive';
import { EaseAnimation } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [EaseAnimation],
  hostDirectives: [ScrollDirective],
})
export class AppComponent implements OnInit {
  title = 'pali-web';

  constructor(
    private _contexts: ChildrenOutletContexts,
    private _publicService: PublicService
  ) {}

  ngOnInit(): void {
    this._publicService.showScrollbar();
  }

  getRouteAnimationData() {
    return this._contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  get isDark(): boolean {
    return this._publicService.isDark;
  }
}
