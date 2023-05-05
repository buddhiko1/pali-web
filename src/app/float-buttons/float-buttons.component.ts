import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { NavbarService } from 'src/app/navbar/navbar.service';
import { PublicService } from 'src/app/core/public.service';

@Component({
  selector: 'app-float-buttons',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './float-buttons.component.html',
  styleUrls: ['./float-buttons.component.css'],
})
export class FloatButtonsComponent {
  constructor(
    private _navbarService: NavbarService,
    private _publicService: PublicService
  ) {}

  toggleMenuBtn(): void {}
}
