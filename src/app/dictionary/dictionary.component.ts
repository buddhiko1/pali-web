import { Component } from '@angular/core';
import { Config as BookConfig } from '../book/book.model';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
})
export class DictionaryComponent {
  bookConfigLeft: BookConfig;
  bookConfigRight: BookConfig;

  constructor() {
    this.bookConfigRight = {
      height: '16rem',
      width: '12rem',
      image: 'assets/images/cover.jpeg',
      spine: 'happy new day',
      direction: 'right-view',
    };
    this.bookConfigLeft = {
      height: '16rem',
      width: '12rem',
      image: 'assets/images/cover.jpeg',
      // header: 'buddha tipitaka',
      spine: 'happy new day',
      direction: 'left-view',
    };
  }
}
