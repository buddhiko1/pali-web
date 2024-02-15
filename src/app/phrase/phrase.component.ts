import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { QuoteSvgComponent } from 'src/app/svg/quote/quote.component';
import { RarrowSvgComponent } from 'src/app/svg/rarrow/rarrow.component';

@Component({
  selector: 'app-phrase',
  standalone: true,
  imports: [RouterLink, QuoteSvgComponent, RarrowSvgComponent],
  templateUrl: './phrase.component.html',
  styleUrl: './phrase.component.css',
})
export class PhraseComponent {}
