import { Component, OnInit } from '@angular/core';
import { Config as BookConfig } from '../book/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bookConfigLeft: BookConfig;
  bookConfigRight: BookConfig;

  constructor() {
    this.bookConfigRight = {
      height: '18rem',
      width: '13.5rem',
      image: 'assets/images/cover.jpeg',
      spine: 'happy new day',
      direction: 'right-view',
    };
    this.bookConfigLeft = {
      height: '16rem',
      width: '12rem',
      header: 'buddha tipitaka',
      spine: 'happy new day',
      direction: 'left-view',
    };
  }

  ngOnInit(): void {}
}
