import { ErrorHandler, Injectable } from '@angular/core';
import { CombinedError } from '@urql/core';

import { NotificationsService } from 'src/app/notifications/notifications.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private _storageService: StorageService,
    private _notificationsService: NotificationsService,
  ) {}

  handleError(error: any): void {
    error instanceof CombinedError
      ? this._handlerServerError(error)
      : this._handlerClientError(error);
  }

  private _handlerServerError(error: CombinedError) {
    if (
      error.graphQLErrors.some((e) => {
        const code = e.extensions?.['code'];
        //TODO Waiting direcuts fix their bug for refreshing token.
        return code === 'INVALID_TOKEN' || code === 'TOKEN_EXPIRED';
      })
    ) {
      this._storageService.clearAccountData();
    } else {
      this._notificationsService.pushErrorInfo({
        title: 'Server Error',
        content: error.networkError?.message ?? error.graphQLErrors[0].message,
      });
    }
  }

  private _handlerClientError(error: any) {
    this._notificationsService.pushErrorInfo({
      title: 'Client Error',
      content: error.toString(),
    });
  }
}
