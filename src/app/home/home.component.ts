import { Component, OnInit } from '@angular/core';
import { Config as BookConfig } from '../book/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bookConfig: BookConfig;

  constructor() {
    this.bookConfig = {
      height: '250px',
      width: '200px',
      // color: 'gray',
      image: 'assets/images/cover.jpeg',
      spine: 'happy new day',
      direction: 'right-view',
    };
  }

  ngOnInit(): void {}
}
