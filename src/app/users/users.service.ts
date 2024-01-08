import { Injectable } from '@angular/core';
import { SystemUrqlService, DataUrqlService } from '../urql/urql.service';
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
  InviteUserDocument,
  InviteUserMutationVariables,
  DeleteAccountDocument,
  DeleteAccountMutationVariables,
  ActiveUserDocument,
  ActiveUserMutationVariables,
  AccountDocument,
  UpdateAccountDocument,
  UpdateAccountMutationVariables,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private _systemUrqlService: SystemUrqlService,
    private _dataUrqlService: DataUrqlService,
  ) {}

  async fetchRoles(): Promise<UserRoleFragment[]> {
    const result = await this._systemUrqlService.query(UserRolesDocument, {});
    return result.data.roles;
  }

  async fetchAccount(): Promise<UserFragment> {
    const result = await this._systemUrqlService.query(AccountDocument, {});
    return result.data.account;
  }

  async updateAccount(
    args: UpdateAccountMutationVariables,
  ): Promise<UserFragment> {
    const result = await this._systemUrqlService.mutation(
      UpdateAccountDocument,
      args,
    );
    return result.data.account;
  }

  async deleteAccount(args: DeleteAccountMutationVariables): Promise<void> {
    await this._systemUrqlService.mutation(DeleteAccountDocument, args);
  }

  async fetchUserById(args: UserByIdQueryVariables): Promise<UserFragment> {
    const result = await this._systemUrqlService.query(UserByIdDocument, args);
    return result.data.user;
  }

  async fetchUserByEmail(
    args: UserByEmailQueryVariables,
  ): Promise<UserFragment | null> {
    const result = await this._systemUrqlService.query(
      UserByEmailDocument,
      args,
    );
    return result.data.users.length ? result.data.users[0] : null;
  }

  async inviteUser(args: InviteUserMutationVariables): Promise<void> {
    await this._systemUrqlService.mutation(InviteUserDocument, args);
  }

  async activeUser(args: ActiveUserMutationVariables): Promise<void> {
    await this._systemUrqlService.mutation(ActiveUserDocument, args);
  }

  async fetchUserAvatar(
    args: UserAvatarQueryVariables,
  ): Promise<AvatarFragment> {
    const result = await this._systemUrqlService.query(
      UserAvatarDocument,
      args,
    );
    return result.data.avatar;
  }

  async deleteOldUserAvatar(
    args: DeleteFileByIdMutationVariables,
  ): Promise<void> {
    await this._systemUrqlService.mutation(DeleteFileByIdDocument, args);
  }

  async fetchUserProfile(
    args: UserProfileQueryVariables,
  ): Promise<UserProfileFragment> {
    const result = await this._dataUrqlService.query(UserProfileDocument, args);
    return result.data.profiles[0];
  }

  async createUserProfile(
    args: CreateUserProfileMutationVariables,
  ): Promise<UserProfileFragment> {
    const result = await this._dataUrqlService.mutation(
      CreateUserProfileDocument,
      args,
    );
    return result.data.profile;
  }

  async updateUserProfile(
    args: UpdateUserProfileMutationVariables,
  ): Promise<UserProfileFragment> {
    const result = await this._dataUrqlService.mutation(
      UpdateUserProfileDocument,
      args,
    );
    return result.data.profile;
  }
}
