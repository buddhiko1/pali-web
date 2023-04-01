import { Component, OnDestroy } from '@angular/core';
import { UrlEnum } from '../app-routing.module';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  UrlEnum: typeof UrlEnum = UrlEnum;

  constructor(private _navbarService: NavbarService) {
    this._navbarService.showShadow(false);
  }

  ngOnDestroy(): void {
    this._navbarService.showShadow(true);
  }
}
