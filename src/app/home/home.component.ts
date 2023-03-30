import { Component } from '@angular/core';
import { UrlEnum } from '../app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  UrlEnum: typeof UrlEnum = UrlEnum;

  constructor() {}
}
