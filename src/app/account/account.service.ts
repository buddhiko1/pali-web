import { Injectable } from '@angular/core';
import { Client } from '@urql/core';

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
  UserMeDocument,
  RoleFragment,
  RolesDocument,
  UpdateMeDocument,
  Update_Directus_Users_Input,
  MeFragment,
  DeleteOldAvatarDocument,
  DeleteOldAvatarMutationVariables,
  FolderWithNameDocument,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private _systemClient: Client;
  constructor(
    private _urqlService: UrqlService,
    private _storageService: StorageService,
  ) {
    this._systemClient = this._urqlService.systemClient;
  }

  async isRegisteredEmail(email: string): Promise<boolean> {
    const result = await this._systemClient.query(UserWithEmailDocument, {
      email,
    });
    const data = validateAndExtractResult(result);
    return data.users.length > 0;
  }

  async createAccount(args: CreateAccountMutationVariables): Promise<void> {
    const result = await this._systemClient.mutation(
      CreateAccountDocument,
      args,
    );
    validateAndExtractResult(result);
  }

  async initAccount(args: InitAccountMutationVariables): Promise<void> {
    const result = await this._systemClient.mutation(InitAccountDocument, args);
    validateAndExtractResult(result);
  }

  async requestReset(args: RequestResetMutationVariables): Promise<void> {
    const result = await this._systemClient.mutation(
      RequestResetDocument,
      args,
    );
    validateAndExtractResult(result);
  }

  async resetPassword(args: ResetPasswordMutationVariables): Promise<void> {
    const result = await this._systemClient.mutation(
      ResetPasswordDocument,
      args,
    );
    validateAndExtractResult(result);
  }

  async login(args: LoginMutationVariables): Promise<void> {
    const loginResult = await this._systemClient.mutation(LoginDocument, args);
    const data = validateAndExtractResult(loginResult);
    this._storageService.saveAuthToken(data.authToken as Auth_Tokens);
    await this.fetchMe();
  }

  async logout(): Promise<void> {
    await this._systemClient.mutation(LogoutDocument, {
      tokenForRefresh: this._storageService.tokenForRefresh,
    });
    this._storageService.clearAccountData();
  }

  async fetchMe(): Promise<void> {
    const result = await this._systemClient.query(UserMeDocument, {});
    const data = validateAndExtractResult(result);
    const me = data.me;
    this._storageService.saveMe(me);
  }

  async fetchRoles(): Promise<RoleFragment[]> {
    const result = await this._systemClient.query(RolesDocument, {});
    const data = validateAndExtractResult(result);
    return data.roles;
  }

  async updateMe(args: Update_Directus_Users_Input): Promise<MeFragment> {
    const result = await this._systemClient.mutation(UpdateMeDocument, {
      data: args,
    });
    const data = validateAndExtractResult(result);
    return data.updatedMe;
  }

  async fetchAvatarFolderId(): Promise<string> {
    const result = await this._systemClient.query(FolderWithNameDocument, {
      name: FolderEnum.Avatar,
    });
    const data = validateAndExtractResult(result);
    return data.folders[0].id;
  }

  async deleteOldAvatar(args: DeleteOldAvatarMutationVariables): Promise<void> {
    await this._systemClient.mutation(DeleteOldAvatarDocument, args);
  }
}
