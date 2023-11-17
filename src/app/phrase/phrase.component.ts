import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { QuoteSvgComponent } from '../svg/quote/quote.component';
import { RarrowSvgComponent } from '../svg/rarrow/rarrow.component';

@Component({
  selector: 'app-phrase',
  standalone: true,
  imports: [CommonModule, RouterLink, QuoteSvgComponent, RarrowSvgComponent],
  templateUrl: './phrase.component.html',
  styleUrl: './phrase.component.css',
})
export class PhraseComponent {}
