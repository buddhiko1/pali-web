import { graphql } from 'src/gql';

graphql(`
  fragment UserMe on directus_users {
    first_name
    last_name
    avatar {
      id
      filename_disk
      folder {
        id
        name
      }
    }
    email
    role {
      name
    }
  }
  fragment UserRole on directus_roles {
    id
    name
  }
  mutation CreateUser($email: String!, $role: String!, $urlForActive: String!) {
    users_invite(email: $email, role: $role, invite_url: $urlForActive)
  }
  mutation ActiveUser($token: String!, $password: String!) {
    users_invite_accept(token: $token, password: $password)
  }
  mutation UpdateMe($data: update_directus_users_input!) {
    updatedMe: update_users_me(data: $data) {
      ...UserMe
    }
  }
  mutation DeleteUserOldAvatar($avatarId: ID!) {
    delete_files_item(id: $avatarId) {
      id
    }
  }
  query UserWithEmail($email: String!) {
    users(filter: { email: { _eq: $email } }) {
      id
    }
  }
  query UserMe {
    me: users_me {
      ...UserMe
    }
  }
  query UserRoles {
    roles {
      ...UserRole
    }
  }
`);
