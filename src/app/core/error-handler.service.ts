import { ErrorHandler, Injectable } from '@angular/core';
import { CombinedError } from '@urql/core';

import { StorageService } from './storage.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationEnum } from '../notification/notification.model';

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
      this._storageService.clearAccountData();
    } else {
      this._notificationService.push({
        timestamp: Date.now(),
        title: 'Server Error',
        type: NotificationEnum.ERROR,
        content: error.networkError?.message ?? error.graphQLErrors[0].message,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _handlerClientError(error: any) {
    this._notificationService.push({
      timestamp: Date.now(),
      title: 'Client Error',
      type: NotificationEnum.ERROR,
      content: error.toString(),
    });
  }
}
