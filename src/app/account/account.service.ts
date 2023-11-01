import { Injectable } from '@angular/core';

import { UrqlService } from 'src/app/core/urql.service';
import { StorageService } from 'src/app/core/storage.service';
import {
  removeNullFields,
  validateAndExtractResult,
} from 'src/app/core/utilities.gql';
import {
  LoginDocument,
  LoginMutationVariables,
  LogoutDocument,
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
  MeDocument,
  Directus_Roles,
  RolesDocument,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private _urqlService: UrqlService,
    private _storageService: StorageService,
  ) {}

  async isRegisteredEmail(email: string): Promise<boolean> {
    const client = this._urqlService.systemClient;
    const result = await client.query(UserWithEmailDocument, { email });
    const data = validateAndExtractResult(result);
    return data.users.length > 0;
  }

  async createAccount(args: CreateAccountMutationVariables): Promise<void> {
    const client = this._urqlService.systemClient;
    const result = await client.mutation(CreateAccountDocument, args);
    validateAndExtractResult(result);
  }

  async initAccount(args: InitAccountMutationVariables): Promise<void> {
    const client = this._urqlService.systemClient;
    const result = await client.mutation(InitAccountDocument, args);
    validateAndExtractResult(result);
  }

  async requestReset(args: RequestResetMutationVariables): Promise<void> {
    const client = this._urqlService.systemClient;
    const result = await client.mutation(RequestResetDocument, args);
    validateAndExtractResult(result);
  }

  async resetPassword(args: ResetPasswordMutationVariables): Promise<void> {
    const client = this._urqlService.systemClient;
    const result = await client.mutation(ResetPasswordDocument, args);
    validateAndExtractResult(result);
  }

  async login(args: LoginMutationVariables): Promise<void> {
    const client = this._urqlService.systemClient;
    const loginResult = await client.mutation(LoginDocument, args);
    const data = validateAndExtractResult(loginResult);
    this._storageService.saveAuthToken(data.login as Auth_Tokens);
    await this.fetchMe();
  }

  async logout(): Promise<void> {
    const client = this._urqlService.systemClient;
    await client.mutation(LogoutDocument, {
      refreshToken: this._storageService.refreshToken,
    });
    this._storageService.clearAccountData();
  }

  async fetchMe(): Promise<void> {
    const client = this._urqlService.systemClient;
    const result = await client.query(MeDocument, {});
    const data = validateAndExtractResult(result);
    const me = removeNullFields(data.users_me, 'role', 'avatar');
    this._storageService.saveMe(me);
  }

  async fetchRoles(): Promise<Directus_Roles[]> {
    const client = this._urqlService.systemClient;
    const result = await client.query(RolesDocument, {});
    const data = validateAndExtractResult(result);
    return data.roles;
  }
}
