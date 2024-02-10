import { Component } from '@angular/core';

import { Config as BookConfig } from '../ui/book/book.model';
import { BookComponent, DirectionEnum } from '../ui/book/book.component';
import { SlideInDirective } from '../shared/directives/slide-in.directive';
import { FadeInDirective } from '../shared/directives/fade-in.directive';
import { UrlService } from '../shared/services/url.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { GithubSvgComponent } from '../svg/github/github.component';
import { DownloadSvgComponent } from '../svg/download/download.component';
import { IconButtonComponent } from '../ui/icon-button/icon-button.component';
import { QuoteSvgComponent } from '../svg/quote/quote.component';
import { BooksService } from './books.service';
import { Books, Cites } from 'src/gql/graphql';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    BookComponent,
    GithubSvgComponent,
    DownloadSvgComponent,
    QuoteSvgComponent,
    IconButtonComponent,
    SlideInDirective,
    FadeInDirective,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: Books[] = [];
  cites: Cites[] = [];

  constructor(
    private _booksService: BooksService,
    private _urlService: UrlService,
    private _utilitiesService: UtilitiesService,
  ) {
    this._booksService.fetchBooks().then((books) => {
      this.books = books;
    });
    this._booksService.fetchCites().then((cites) => {
      this.cites = cites;
    });
  }

  bookConfigFor(book: Books): BookConfig {
    return {
      height: '16rem',
      width: '12rem',
      image: this._urlService.fileUrlFor(book.cover?.filename_disk),
      color: '#477999',
      direction: DirectionEnum.FrontView,
    };
  }

  openBookUrl(book: Books) {
    this._utilitiesService.openNewTab(book.info_url);
  }

  downloadBook(book: Books) {
    const downloadUrl = this._urlService.fileUrlFor(book.zip?.filename_disk);
    const downloadFilename = book.name + '.zip';
    console.error('download book:', book);
    this._utilitiesService.downloadFile(downloadUrl, downloadFilename);
  }
}
