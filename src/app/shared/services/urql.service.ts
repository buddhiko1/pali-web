import { Injectable } from '@angular/core';
import {
  Client,
  DocumentInput,
  AnyVariables,
  OperationResult,
  cacheExchange,
  fetchExchange,
  Exchange,
} from '@urql/core';
import { devtoolsExchange } from '@urql/devtools';

import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

abstract class UrqlService {
  protected _exchanges: Exchange[];
  constructor() {
    const defaultExchanges = environment.production ? [] : [devtoolsExchange];
    this._exchanges = defaultExchanges.concat([cacheExchange, fetchExchange]);
  }

  protected abstract get client(): Client;

  private get _client(): Client {
    return this.client;
  }

  private _validateResult(result: OperationResult): OperationResult {
    if (result.error) {
      // the error with be catch by ErrorhandlerService.
      throw result.error;
    }
    return result;
  }

  async query(
    doc: DocumentInput,
    variables?: AnyVariables,
  ): Promise<OperationResult> {
    const result = await this._client.query(doc, variables);
    return this._validateResult(result);
  }

  async mutation(
    doc: DocumentInput,
    variables?: AnyVariables,
  ): Promise<OperationResult> {
    const result = await this._client.mutation(doc, variables);
    return this._validateResult(result);
  }
}

@Injectable({
  providedIn: 'root',
})
export class DataUrqlService extends UrqlService {
  private _url = `${environment.cms}/graphql`;
  constructor(private _storageService: StorageService) {
    super();
  }
  get client(): Client {
    const fetchOptions = this._storageService.isLoggedIn
      ? {
          headers: {
            Authorization: `Bearer ${this._storageService.tokenForAccess}`,
          },
        }
      : {};
    return new Client({
      url: this._url,
      exchanges: this._exchanges,
      fetchOptions,
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class SystemUrqlService extends UrqlService {
  private _url = `${environment.cms}/graphql/system`;
  constructor(private _storageService: StorageService) {
    super();
  }
  get client(): Client {
    const fetchOptions = this._storageService.isLoggedIn
      ? {
          headers: {
            Authorization: `Bearer ${this._storageService.tokenForAccess}`,
          },
        }
      : {};
    return new Client({
      url: this._url,
      exchanges: this._exchanges,
      fetchOptions,
    });
  }
}
