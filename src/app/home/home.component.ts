import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { Modules } from 'src/gql/graphql';
import { SliderDirective } from '../core/slider.directive';
import { FadeInDirective } from '../core/fade-in.directive';
import { PhraseComponent } from '../phrase/phrase.component';
import { NavbarService } from '../navbar/navbar.service';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AngularSvgIconModule,
    SliderDirective,
    FadeInDirective,
    PhraseComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnDestroy {
  modules: Modules[] = [];

  constructor(
    private _navbarService: NavbarService,
    private _homeService: HomeService,
  ) {
    this._navbarService.showShadow(false);
    this._homeService.fetchModules().then((modules) => {
      this.modules = modules;
    });
  }

  ngOnDestroy(): void {
    this._navbarService.showShadow(true);
  }
}
