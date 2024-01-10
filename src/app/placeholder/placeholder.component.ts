import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SlideInDirective } from '../shared/directives/slide-in.directive';
import { FadeInDirective } from '../shared/directives/fade-in.directive';
import { BackButtonDirective } from '../shared/directives/back-button.directive';
import { LarrowSvgComponent } from '../svg/larrow/larrow.component';
import { SnowBgComponent } from '../ui/snow-bg/snow-bg.component';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  imports: [
    LarrowSvgComponent,
    BackButtonDirective,
    SnowBgComponent,
    SlideInDirective,
    FadeInDirective,
  ],
  templateUrl: './placeholder.component.html',
  styleUrl: './placeholder.component.css',
})
export class PlaceholderComponent {
  text = '';

  constructor(private _activeRoute: ActivatedRoute) {
    this._activeRoute.params.subscribe((params: Params) => {
      this.text = params['text'];
    });
    this._activeRoute.data.subscribe((data) => {
      this.text = data['text'];
    });
  }
}
