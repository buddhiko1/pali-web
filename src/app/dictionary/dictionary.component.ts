import { Component } from '@angular/core';
import { Config as BookConfig } from '../book/book.model';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
})
export class DictionaryComponent {
  dpdConfig: BookConfig;
  dppnConfig: BookConfig;
  ncpedConfig: BookConfig;
  ptsConfig: BookConfig;
  abbrConfig: BookConfig;
  private _color = '#477999';

  constructor() {
    this.dpdConfig = {
      height: '16rem',
      width: '12rem',
      // header: 'Digital Pali Dictionary',
      image: 'assets/images/dpd.jpg',
      color: this._color,
      direction: 'right-view',
    };
    this.ncpedConfig = {
      height: '16rem',
      width: '12rem',
      image: 'assets/images/ncped.jpg',
      color: this._color,
      direction: 'left-view',
    };
    this.dppnConfig = {
      height: '16rem',
      width: '12rem',
      image: 'assets/images/dppn.jpg',
      color: this._color,
      direction: 'left-view',
    };
    this.ptsConfig = {
      height: '16rem',
      width: '12rem',
      image: 'assets/images/pts.jpg',
      color: this._color,
      direction: 'right-view',
    };
    this.abbrConfig = {
      height: '16rem',
      width: '12rem',
      image: 'assets/images/abbr.jpg',
      color: this._color,
      direction: 'right-view',
    };
  }
}
