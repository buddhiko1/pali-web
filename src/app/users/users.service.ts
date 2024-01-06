import { Injectable } from '@angular/core';

import { StorageService } from '../shared/services/storage.service';
import { SystemUrqlService } from '../urql/urql.service';
import {
  UserByEmailDocument,
  UserByEmailQueryVariables,
  UserRoleFragment,
  UserRolesDocument,
  UserFragment,
  UserByIdDocument,
  UserByIdQueryVariables,
  AvatarFragment,
  UserAvatarDocument,
  UserAvatarQueryVariables,
  DeleteFileByIdDocument,
  DeleteFileByIdMutationVariables,
  UserProfileFragment,
  UserProfileDocument,
  UserProfileQueryVariables,
  CreateUserProfileDocument,
  CreateUserProfileMutationVariables,
  UpdateUserProfileDocument,
  UpdateUserProfileMutationVariables,
  CreateUserDocument,
  CreateUserMutationVariables,
  DeleteUserDocument,
  ActiveUserDocument,
  ActiveUserMutationVariables,
  AccountDocument,
  UpdateAccountDocument,
  UpdateAccountMutationVariables,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private _storageService: StorageService,
    private _urqlService: SystemUrqlService,
  ) {}

  async fetchRoles(): Promise<UserRoleFragment[]> {
    const result = await this._urqlService.query(UserRolesDocument, {});
    return result.data.roles;
  }

  async fetchAccount(): Promise<void> {
    const result = await this._urqlService.query(AccountDocument, {});
    this._storageService.saveAccount(result.data.account);
  }

  async updateAccount(
    args: UpdateAccountMutationVariables,
  ): Promise<UserFragment> {
    const result = await this._urqlService.mutation(
      UpdateAccountDocument,
      args,
    );
    return result.data.account;
  }

  async deleteAccount(): Promise<void> {
    await this._urqlService.mutation(DeleteUserDocument, {
      id: this._storageService.account?.id,
    });
  }

  async fetchUserById(args: UserByIdQueryVariables): Promise<UserFragment> {
    const result = await this._urqlService.query(UserByIdDocument, args);
    return result.data.user;
  }

  async fetchUserByEmail(
    args: UserByEmailQueryVariables,
  ): Promise<UserFragment | null> {
    const result = await this._urqlService.query(UserByEmailDocument, args);
    return result.data.users.length ? result.data.users[0] : null;
  }

  async createUser(args: CreateUserMutationVariables): Promise<void> {
    await this._urqlService.mutation(CreateUserDocument, args);
  }

  async activeUser(args: ActiveUserMutationVariables): Promise<void> {
    await this._urqlService.mutation(ActiveUserDocument, args);
  }

  async fetchUserAvatar(
    args: UserAvatarQueryVariables,
  ): Promise<AvatarFragment> {
    const result = await this._urqlService.query(UserAvatarDocument, args);
    return result.data.avatar;
  }

  async deleteOldUserAvatar(
    args: DeleteFileByIdMutationVariables,
  ): Promise<void> {
    await this._urqlService.mutation(DeleteFileByIdDocument, args);
  }

  async fetchUserProfile(
    args: UserProfileQueryVariables,
  ): Promise<UserProfileFragment> {
    const result = await this._urqlService.query(UserProfileDocument, args);
    return result.data.profile[0];
  }

  async createUserProfile(
    args: CreateUserProfileMutationVariables,
  ): Promise<UserProfileFragment> {
    const result = await this._urqlService.mutation(
      CreateUserProfileDocument,
      args,
    );
    return result.data.profile;
  }

  async updateUserProfile(
    args: UpdateUserProfileMutationVariables,
  ): Promise<UserProfileFragment> {
    const result = await this._urqlService.mutation(
      UpdateUserProfileDocument,
      args,
    );
    return result.data.profile;
  }
}
