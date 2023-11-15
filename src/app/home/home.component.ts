import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SlideInDirective } from '../core/slide-in.directive';
import { RarrowSvgComponent } from '../svg/rarrow/rarrow.component';
import { FadeInDirective } from '../core/fade-in.directive';
import { PhraseComponent } from '../phrase/phrase.component';

import { HomeService } from './home.service';
import { Modules } from 'src/gql/graphql';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RarrowSvgComponent,
    SlideInDirective,
    FadeInDirective,
    PhraseComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  modules: Modules[] = [];

  constructor(private _homeService: HomeService) {
    this._homeService.fetchModules().then((modules) => {
      this.modules = modules;
    });
  }
}
