import { Injectable } from '@angular/core';

import { StorageService } from 'src/app/core/storage.service';
import { UrqlService } from 'src/app/core/urql.service';
import { validateAndExtractResult } from 'src/app/core/utilities.gql';
import { FolderEnum } from '../core/value.cms';
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
  RoleFieldsFragment,
  RolesDocument,
  UpdateMeDocument,
  Update_Directus_Users_Input,
  MeFieldsFragment,
  DeleteOldAvatarDocument,
  DeleteOldAvatarMutationVariables,
  FolderWithNameDocument,
  FolderWithNameQueryVariables,
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
    const me = data.users_me;
    this._storageService.saveMe(me);
  }

  async fetchRoles(): Promise<RoleFieldsFragment[]> {
    const client = this._urqlService.systemClient;
    const result = await client.query(RolesDocument, {});
    const data = validateAndExtractResult(result);
    return data.roles;
  }

  async updateMe(args: Update_Directus_Users_Input): Promise<MeFieldsFragment> {
    const client = this._urqlService.systemClient;
    const result = await client.mutation(UpdateMeDocument, {
      data: args,
    });
    const data = validateAndExtractResult(result);
    return data.update_users_me;
  }

  async fetchAvatarFolderId(): Promise<string> {
    const client = this._urqlService.systemClient;
    const result = await client.query(FolderWithNameDocument, {
      name: FolderEnum.Avatar,
    });
    const data = validateAndExtractResult(result);
    return data.folders[0].id;
  }

  async deleteOldAvatar(args: DeleteOldAvatarMutationVariables): Promise<void> {
    const client = this._urqlService.systemClient;
    await client.mutation(DeleteOldAvatarDocument, args);
  }
}
