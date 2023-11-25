import { ErrorHandler, Injectable } from '@angular/core';
import { CombinedError } from '@urql/core';

import { NotificationService } from 'src/app/notification/notification.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private _storageService: StorageService,
    private _notificationService: NotificationService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): void {
    console.error(error);
    error instanceof CombinedError
      ? this._handlerServerError(error)
      : this._handlerClientError(error);
  }

  private _handlerServerError(error: CombinedError) {
    if (
      error.graphQLErrors.some((e) => {
        const code = e.extensions?.['code'];
        return code === 'TOKEN_EXPIRED' || code === 'INVALID_TOKEN';
      })
    ) {
      this._storageService.clearLoginedUserData();
    } else {
      this._notificationService.pushErrorInfo({
        title: 'Server Error',
        content: error.networkError?.message ?? error.graphQLErrors[0].message,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _handlerClientError(error: any) {
    this._notificationService.pushErrorInfo({
      title: 'Client Error',
      content: error.toString(),
    });
  }
}
