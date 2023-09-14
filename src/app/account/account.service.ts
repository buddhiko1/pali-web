import { Injectable } from '@angular/core';

import { UrqlService } from 'src/app/core/urql.service';
import { StorageService } from 'src/app/core/storage.service';
import {
  removeNullFields,
  checkAndExtractResult,
} from 'src/app/core/utils.gql';
import {
  LoginDocument,
  LoginMutationVariables,
  LogoutDocument,
  LogoutMutationVariables,
  Auth_Tokens,
  CreateAccountDocument,
  CreateAccountMutationVariables,
  InitAccountDocument,
  InitAccountMutationVariables,
  RequestResetDocument,
  RequestResetMutationVariables,
  ResetPasswordDocument,
  ResetPasswordMutationVariables,
  UserWithEmailDocument,
  UserWithEmailQueryVariables,
  MeDocument,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private _urqlService: UrqlService,
    private _storageService: StorageService
  ) {}

  async isRegisteredEmail(email: string): Promise<boolean> {
    const client = this._urqlService.systemClient;
    const args: UserWithEmailQueryVariables = {
      email,
    };
    const result = await client.query(UserWithEmailDocument, args);
    const data = checkAndExtractResult(result);
    return data.users.length > 0;
  }

  async createAccount(args: CreateAccountMutationVariables): Promise<void> {
    const client = this._urqlService.systemClient;
    const result = await client.mutation(CreateAccountDocument, args);
    checkAndExtractResult(result);
  }

  async initAccount(args: InitAccountMutationVariables): Promise<void> {
    const client = this._urqlService.systemClient;
    const result = await client.mutation(InitAccountDocument, args);
    checkAndExtractResult(result);
  }

  async requestReset(args: RequestResetMutationVariables): Promise<void> {
    const client = this._urqlService.systemClient;
    const result = await client.mutation(RequestResetDocument, args);
    checkAndExtractResult(result);
  }

  async resetPassword(args: ResetPasswordMutationVariables): Promise<void> {
    const client = this._urqlService.systemClient;
    const result = await client.mutation(ResetPasswordDocument, args);
    checkAndExtractResult(result);
  }

  async login(args: LoginMutationVariables): Promise<void> {
    const client = this._urqlService.systemClient;
    const loginResult = await client.mutation(LoginDocument, args);
    const data = checkAndExtractResult(loginResult);
    this._storageService.saveAuthToken(data.login as Auth_Tokens);
    await this.fetchMe();
  }

  async logout(): Promise<void> {
    const client = this._urqlService.systemClient;
    const args: LogoutMutationVariables = {
      refreshToken: this._storageService.refreshToken,
    };
    await client.mutation(LogoutDocument, args);
    this._storageService.clearAccountData();
  }

  async fetchMe(): Promise<void> {
    const client = this._urqlService.systemClient;
    const result = await client.query(MeDocument, {});
    const data = checkAndExtractResult(result);
    const me = removeNullFields(data.users_me, 'role', 'avatar');
    this._storageService.saveMe(me);
  }
}
