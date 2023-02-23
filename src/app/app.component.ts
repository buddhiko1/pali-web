import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { PublicService } from './core/public.service';
import { easeAnimation } from './app.animations';
import { ScrollDirective } from './scroll.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [easeAnimation],
  hostDirectives: [ScrollDirective],
})
export class AppComponent implements OnInit {
  title = 'pali-web';

  constructor(
    private contexts: ChildrenOutletContexts,
    private publicService: PublicService
  ) {}

  ngOnInit(): void {
    this.publicService.showScrollbar();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  get isDark(): boolean {
    return this.publicService.isDark;
  }
}
