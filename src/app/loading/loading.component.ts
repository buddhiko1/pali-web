import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { WheelSvgComponent } from '../svg/wheel/wheel.component';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, DialogComponent, WheelSvgComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {}
