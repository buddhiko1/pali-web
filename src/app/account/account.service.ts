import { Injectable } from '@angular/core';

import { StorageService } from 'src/app/core/storage.service';
import { SystemUrqlService } from '../urql/urql.service';
import { FolderEnum } from '../core/value.cms';
import {
  LoginDocument,
  LoginMutationVariables,
  LogoutDocument,
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
  constructor(
    private _storageService: StorageService,
    private _urqlService: SystemUrqlService,
  ) {}

  async isRegisteredEmail(email: string): Promise<boolean> {
    const result = await this._urqlService.query(UserWithEmailDocument, {
      email,
    });
    return !!result?.data?.users?.length;
  }

  async createAccount(args: CreateAccountMutationVariables): Promise<void> {
    await this._urqlService.mutation(CreateAccountDocument, args);
  }

  async initAccount(args: InitAccountMutationVariables): Promise<void> {
    await this._urqlService.mutation(InitAccountDocument, args);
  }

  async requestReset(args: RequestResetMutationVariables): Promise<void> {
    await this._urqlService.mutation(RequestResetDocument, args);
  }

  async resetPassword(args: ResetPasswordMutationVariables): Promise<void> {
    await this._urqlService.mutation(ResetPasswordDocument, args);
  }

  async login(args: LoginMutationVariables): Promise<void> {
    throw 'dthsaf asfdasd asdfasdf asdf asd f asd f asdfasdfa fasdfasdfa sdfasdfasf dsafasdfas';
    const result = await this._urqlService.mutation(LoginDocument, args);
    this._storageService.saveAuthToken(result.data.authToken);
    await this.fetchMe();
  }

  async logout(): Promise<void> {
    await this._urqlService.mutation(LogoutDocument, {
      tokenForRefresh: this._storageService.tokenForRefresh,
    });
    this._storageService.clearAccountData();
  }

  async fetchMe(): Promise<void> {
    const result = await this._urqlService.query(UserMeDocument, {});
    if (result.data?.me) {
      this._storageService.saveMe(result.data.me);
    }
  }

  async fetchRoles(): Promise<RoleFragment[]> {
    const result = await this._urqlService.query(RolesDocument, {});
    return result.data.roles;
  }

  async updateMe(args: Update_Directus_Users_Input): Promise<MeFragment> {
    const result = await this._urqlService.mutation(UpdateMeDocument, {
      data: args,
    });
    return result.data.updatedMe;
  }

  async fetchAvatarFolderId(): Promise<string> {
    const result = await this._urqlService.query(FolderWithNameDocument, {
      name: FolderEnum.Avatar,
    });
    return result.data.folders[0].id;
  }

  async deleteOldAvatar(args: DeleteOldAvatarMutationVariables): Promise<void> {
    await this._urqlService.mutation(DeleteOldAvatarDocument, args);
  }
}
