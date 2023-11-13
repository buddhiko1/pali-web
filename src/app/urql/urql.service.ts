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
import { StorageService } from '../core/storage.service';
import { UrqlExchange } from './urql.exchange';

abstract class UrqlService {
  protected _exchangesForPublic: Exchange[];
  protected _exchangesForUser: Exchange[];
  constructor(
    protected _storageService: StorageService,
    protected _urqlExchange: UrqlExchange,
  ) {
    const defaultExchanges = environment.production ? [] : [devtoolsExchange];
    this._exchangesForUser = defaultExchanges.concat([
      cacheExchange,
      this._urqlExchange.authExchange,
      fetchExchange,
    ]);
    this._exchangesForPublic = defaultExchanges.concat([
      cacheExchange,
      fetchExchange,
    ]);
  }

  protected abstract get clientForUser(): Client;

  protected abstract get clientForPublic(): Client;

  private get _client(): Client {
    return this._storageService.isLoggedIn
      ? this.clientForUser
      : this.clientForPublic;
  }

  private _validateResult(result: OperationResult): OperationResult {
    if (result.error) {
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
  constructor(
    protected override _storageService: StorageService,
    protected override _urqlExchange: UrqlExchange,
  ) {
    super(_storageService, _urqlExchange);
  }
  get clientForUser(): Client {
    return new Client({
      url: this._url,
      exchanges: this._exchangesForUser,
    });
  }
  get clientForPublic(): Client {
    return new Client({
      url: this._url,
      exchanges: this._exchangesForPublic,
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class SystemUrqlService extends UrqlService {
  private _url = `${environment.cms}/graphql/system`;
  constructor(
    protected override _storageService: StorageService,
    protected override _urqlExchange: UrqlExchange,
  ) {
    super(_storageService, _urqlExchange);
  }
  get clientForUser(): Client {
    return new Client({
      url: this._url,
      exchanges: this._exchangesForUser,
    });
  }
  get clientForPublic(): Client {
    return new Client({
      url: this._url,
      exchanges: this._exchangesForPublic,
    });
  }
}
