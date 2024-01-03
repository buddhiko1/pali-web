import { Injectable } from '@angular/core';

import { StorageService } from '../shared/services/storage.service';
import { SystemUrqlService } from '../urql/urql.service';
import {
  CreateUserDocument,
  CreateUserMutationVariables,
  ActiveUserDocument,
  ActiveUserMutationVariables,
  UserByEmailDocument,
  UserByIdDocument,
  UserByIdQueryVariables,
  UserFragment,
  UserMeDocument,
  UserRoleFragment,
  UserRolesDocument,
  UpdateMeDocument,
  UpdateMeMutationVariables,
  DeleteUserOldAvatarDocument,
  DeleteUserOldAvatarMutationVariables,
  AvatarFragment,
  UserAvatarDocument,
  UserAvatarQueryVariables,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private _storageService: StorageService,
    private _urqlService: SystemUrqlService,
  ) {}

  async isRegisteredEmail(email: string): Promise<boolean> {
    const result = await this._urqlService.query(UserByEmailDocument, {
      email,
    });
    return !!result?.data?.users?.length;
  }

  async fetchMe(): Promise<void> {
    const result = await this._urqlService.query(UserMeDocument, {});
    this._storageService.saveMe(result.data.me);
  }

  async fetchUserById(args: UserByIdQueryVariables): Promise<UserFragment> {
    const result = await this._urqlService.query(UserByIdDocument, args);
    return result.data.user;
  }

  async fetchUserAvatar(
    args: UserAvatarQueryVariables,
  ): Promise<AvatarFragment> {
    const result = await this._urqlService.query(UserAvatarDocument, args);
    return result.data.userAvatar;
  }

  async fetchRoles(): Promise<UserRoleFragment[]> {
    const result = await this._urqlService.query(UserRolesDocument, {});
    return result.data.roles;
  }

  async createUser(args: CreateUserMutationVariables): Promise<void> {
    await this._urqlService.mutation(CreateUserDocument, args);
  }

  async activeUser(args: ActiveUserMutationVariables): Promise<void> {
    await this._urqlService.mutation(ActiveUserDocument, args);
  }

  async updateMe(args: UpdateMeMutationVariables): Promise<UserFragment> {
    const result = await this._urqlService.mutation(UpdateMeDocument, args);
    return result.data.updatedMe;
  }

  async deleteOldUserAvatar(
    args: DeleteUserOldAvatarMutationVariables,
  ): Promise<void> {
    await this._urqlService.mutation(DeleteUserOldAvatarDocument, args);
  }
}
