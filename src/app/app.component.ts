import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { StorageService } from './shared/services/storage.service';
import { FadeInDirective } from './shared/directives/fade-in.directive';
import { FolderEnum } from './shared/values/cms.values';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './navbar/navbar.service';
import { NavigationService } from './shared/services/navigation.service';
import { FooterComponent } from './footer/footer.component';
import { NotificationsComponent } from './notifications/notifications.component';
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
    NotificationsComponent,
  ],
})
export class AppComponent {
  title = 'pali-web';

  constructor(
    private _navbarService: NavbarService,
    private _appService: AppService,
    private _storageService: StorageService,
    private _navigationService: NavigationService, // Must instantiate it here for recording history
  ) {
    this._initFolderId();
  }

  get theme(): string {
    return this._navbarService.theme;
  }

  private _initFolderId(): void {
    this._appService
      .fetchFolderIdByName({
        name: FolderEnum.Avatar,
      })
      .then((folderId) => (this._storageService.avatarFolderId = folderId));
    this._appService
      .fetchFolderIdByName({
        name: FolderEnum.Wysiwyg,
      })
      .then((folderId) => (this._storageService.wysiwygFolderId = folderId));
  }
}
