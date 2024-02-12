import { graphql } from 'src/gql';

graphql(`
  fragment Avatar on directus_files {
    id
    filename_disk
    folder {
      id
    }
  }

  query UserAvatar($avatarId: ID!) {
    avatar: files_by_id(id: $avatarId) {
      ...Avatar
    }
  }

  fragment UserRole on directus_roles {
    id
    name
  }

  query UserRolesByName($name: String!) {
    roles(filter: { name: { _eq: $name } }) {
      ...UserRole
    }
  }

  fragment UserProfile on user_profile {
    id
    alais
  }

  query UserProfile($userId: String!) {
    profiles: user_profile(filter: { user: { id: { _eq: $userId } } }) {
      ...UserProfile
    }
  }

  mutation CreateUserProfile($data: create_user_profile_input!) {
    profile: create_user_profile_item(data: $data) {
      ...UserProfile
    }
  }

  mutation UpdateUserProfile($id: ID!, $data: update_user_profile_input!) {
    profile: update_user_profile_item(id: $id, data: $data) {
      ...UserProfile
    }
  }

  fragment User on directus_users {
    id
    first_name
    last_name
    avatar {
      id
    }
    email
    role {
      name
    }
  }

  query UserByEmail($email: String!) {
    users(filter: { email: { _eq: $email } }) {
      ...User
    }
  }

  query UserById($id: ID!) {
    user: users_by_id(id: $id) {
      ...User
    }
  }

  query Account {
    account: users_me {
      ...User
    }
  }

  mutation InviteUser($email: String!, $role: String!, $invite_url: String!) {
    users_invite(email: $email, role: $role, invite_url: $invite_url)
  }

  mutation ActiveUser($token: String!, $password: String!) {
    users_invite_accept(token: $token, password: $password)
  }

  mutation UpdateAccount($data: update_directus_users_input!) {
    account: update_users_me(data: $data) {
      ...User
    }
  }

  mutation DeleteAccount($id: ID!) {
    user: delete_users_item(id: $id) {
      id
    }
  }
`);
