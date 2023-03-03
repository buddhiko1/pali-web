import { Component } from '@angular/core';
import { Config as BookConfig } from '../book/book.model';

@Component({
  selector: 'app-tipitaka',
  templateUrl: './tipitaka.component.html',
  styleUrls: ['./tipitaka.component.css'],
})
export class TipitakaComponent {
  suttaConfig: BookConfig;
  vinayaConfig: BookConfig;
  abhidhammaConfig: BookConfig;
  private _color = '#477999';
  constructor() {
    this.suttaConfig = {
      height: '16rem',
      width: '12rem',
      // header: 'Digital Pali Dictionary',
      image: 'assets/images/sutta.jpg',
      color: this._color,
      direction: 'front-view',
    };
    this.vinayaConfig = {
      height: '16rem',
      width: '12rem',
      // header: 'Digital Pali Dictionary',
      image: 'assets/images/vinaya.jpg',
      color: this._color,
      direction: 'front-view',
    };
    this.abhidhammaConfig = {
      height: '16rem',
      width: '12rem',
      // header: 'Digital Pali Dictionary',
      image: 'assets/images/abhidhamma.jpg',
      color: this._color,
      direction: 'front-view',
    };
  }
}
