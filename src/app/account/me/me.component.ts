import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MeFieldsFragment } from 'src/gql/graphql';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/core/storage.service';
import { OverlayService } from 'src/app/overlay/overlay.service';
import { NavigationService } from 'src/app/core/navigation.service';
import { StatusEnum as LoaderStatusEnum } from 'src/app/loader/loader.component';
import { AccountService } from '../account.service';
import { UrlEnum } from '../account-routing.module';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent {
  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

  constructor(
    private _accountService: AccountService,
    private _storageService: StorageService,
    private _overlayService: OverlayService,
    private _navigationService: NavigationService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
  ) {}

  get isLoaderActived(): boolean {
    return this.loaderStatus !== LoaderStatusEnum.Idle;
  }

  get me(): MeFieldsFragment | null {
    return this._storageService.me;
  }

  get avatarUrl(): string {
    return this._storageService.me?.avatar
      ? `${environment.fileServer}/${this._storageService.me.avatar.filename_disk}`
      : 'assets/icons/person.svg';
  }

  onLogout(): void {
    this._navigationService.back();
    this._accountService.logout();
  }

  onReset(): void {
    this._router.navigate([`../${UrlEnum.ResetRequest}`], {
      relativeTo: this._activeRoute,
    });
  }

  async onAvatarSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      this._overlayService.active();
      this.loaderStatus = LoaderStatusEnum.Loading;

      const formData = new FormData();
      formData.append('folder', this.me!.avatar!.folder!.id);
      formData.append('file', file);
      const newAavatar = await this._accountService.uploadAvatar(formData);
      const oldAavatarId = this.me!.avatar!.id;
      const updatedMe = await this._accountService.updateMe({
        avatar: {
          id: newAavatar.id,
        },
      });
      this._storageService.saveMe(updatedMe);
      await this._accountService.deleteOldAvatar({ avatarId: oldAavatarId });

      this.loaderStatus = LoaderStatusEnum.Idle;
      this._overlayService.deactive();
    }
  }

  rmLoader(): void {
    this.loaderStatus = LoaderStatusEnum.Idle;
  }
}
