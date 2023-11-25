import { Injectable } from '@angular/core';

import { StorageService } from '../shared/services/storage.service';
import { SystemUrqlService } from '../urql/urql.service';
import { FolderEnum } from '../shared/values/cms.values';
import {
  CreateUserDocument,
  CreateUserMutationVariables,
  ActiveUserDocument,
  ActiveUserMutationVariables,
  UserWithEmailDocument,
  UserMeFragment,
  UserMeDocument,
  UserRoleFragment,
  UserRolesDocument,
  UpdateMeDocument,
  Update_Directus_Users_Input,
  DeleteUserOldAvatarDocument,
  DeleteUserOldAvatarMutationVariables,
  FolderWithNameDocument,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class UsersService {
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

  async createUser(args: CreateUserMutationVariables): Promise<void> {
    await this._urqlService.mutation(CreateUserDocument, args);
  }

  async activeUser(args: ActiveUserMutationVariables): Promise<void> {
    await this._urqlService.mutation(ActiveUserDocument, args);
  }

  async fetchMe(): Promise<void> {
    const result = await this._urqlService.query(UserMeDocument, {});
    if (result.data?.me) {
      this._storageService.saveMe(result.data.me);
    }
  }

  async fetchRoles(): Promise<UserRoleFragment[]> {
    const result = await this._urqlService.query(UserRolesDocument, {});
    return result.data.roles;
  }

  async updateMe(args: Update_Directus_Users_Input): Promise<UserMeFragment> {
    const result = await this._urqlService.mutation(UpdateMeDocument, {
      data: args,
    });
    return result.data.updatedMe;
  }

  async fetchFolderIdOfUserAvatar(): Promise<string> {
    const result = await this._urqlService.query(FolderWithNameDocument, {
      name: FolderEnum.Avatar,
    });
    return result.data.folders[0].id;
  }

  async deleteOldUserAvatar(
    args: DeleteUserOldAvatarMutationVariables,
  ): Promise<void> {
    await this._urqlService.mutation(DeleteUserOldAvatarDocument, args);
  }
}
