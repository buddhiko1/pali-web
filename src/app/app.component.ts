import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { StorageService } from './shared/services/storage.service';
import { FadeInDirective } from './shared/directives/fade-in.directive';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './navbar/navbar.service';
import { FooterComponent } from './footer/footer.component';
import { NotificationComponent } from './notification/notification.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    FadeInDirective,
    FooterComponent,
    NotificationComponent,
  ],
})
export class AppComponent {
  title = 'pali-web';

  constructor(
    private _navbarService: NavbarService,
    private _appService: AppService,
    private _storageService: StorageService,
  ) {
    this.initialize();
  }

  get theme(): string {
    return this._navbarService.theme;
  }

  initialize(): void {
    this._appService
      .fetchFolderIdOfUserAvatar()
      .then((folderId) => (this._storageService.avatarFolderId = folderId));
    this._appService
      .fetchFolderIdOfWysiwyg()
      .then((folderId) => (this._storageService.wysiwygFolderId = folderId));
  }
}
