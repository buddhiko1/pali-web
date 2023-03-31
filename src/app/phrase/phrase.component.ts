import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-phrase',
  standalone: true,
  imports: [CommonModule, RouterLink, AngularSvgIconModule],
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.css'],
})
export class PhraseComponent {}
