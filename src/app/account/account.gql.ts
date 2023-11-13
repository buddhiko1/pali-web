import { graphql } from 'src/gql';

graphql(`
  fragment Me on directus_users {
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
  fragment Role on directus_roles {
    id
    name
  }
  mutation CreateAccount(
    $email: String!
    $role: String!
    $urlForInit: String!
  ) {
    users_invite(email: $email, role: $role, invite_url: $urlForInit)
  }
  mutation InitAccount($token: String!, $password: String!) {
    users_invite_accept(token: $token, password: $password)
  }
  mutation RequestReset($email: String!, $urlForReset: String!) {
    auth_password_request(email: $email, reset_url: $urlForReset)
  }
  mutation ResetPassword($token: String!, $password: String!) {
    auth_password_reset(token: $token, password: $password)
  }
  mutation Login($email: String!, $password: String!) {
    authToken: auth_login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
  mutation Logout($tokenForRefresh: String!) {
    auth_logout(refresh_token: $tokenForRefresh)
  }
  mutation UpdateMe($data: update_directus_users_input!) {
    updatedMe: update_users_me(data: $data) {
      ...Me
    }
  }
  mutation DeleteOldAvatar($avatarId: ID!) {
    delete_files_item(id: $avatarId) {
      id
    }
  }
  query UserWithEmail($email: String!) {
    users(filter: { email: { _eq: $email } }) {
      id
    }
  }
  query FolderWithName($name: String!) {
    folders(filter: { name: { _eq: $name } }) {
      id
    }
  }
  query UserMe {
    me: users_me {
      ...Me
    }
  }
  query Roles {
    roles {
      ...Role
    }
  }
`);
