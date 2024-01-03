import { graphql } from 'src/gql';

graphql(`
  fragment Avatar on directus_files {
    id
    filename_disk
    folder {
      id
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

  fragment UserRole on directus_roles {
    id
    name
  }

  query UserByEmail($email: String!) {
    users(filter: { email: { _eq: $email } }) {
      id
    }
  }

  query UserById($id: ID!) {
    user: users_by_id(id: $id) {
      ...User
    }
  }

  query UserAvatar($avatarId: ID!) {
    userAvatar: files_by_id(id: $avatarId) {
      ...Avatar
    }
  }

  query UserMe {
    me: users_me {
      ...User
    }
  }

  query UserRoles {
    roles {
      ...UserRole
    }
  }

  mutation CreateUser($email: String!, $role: String!, $urlForActive: String!) {
    users_invite(email: $email, role: $role, invite_url: $urlForActive)
  }

  mutation ActiveUser($token: String!, $password: String!) {
    users_invite_accept(token: $token, password: $password)
  }

  mutation UpdateMe($data: update_directus_users_input!) {
    updatedMe: update_users_me(data: $data) {
      ...User
    }
  }
`);
