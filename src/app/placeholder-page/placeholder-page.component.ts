import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { SlideInDirective } from '../core/slide-in.directive';
import { FadeInDirective } from '../core/fade-in.directive';
import { BackButtonDirective } from '../core/back-button.directive';
import { LarrowSvgComponent } from '../svg/larrow/larrow.component';
import { SnowBgComponent } from '../snow-bg/snow-bg.component';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  imports: [
    CommonModule,
    LarrowSvgComponent,
    BackButtonDirective,
    SnowBgComponent,
    SlideInDirective,
    FadeInDirective,
  ],
  templateUrl: './placeholder-page.component.html',
  styleUrl: './placeholder-page.component.css',
})
export class PlaceholderPageComponent {
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
