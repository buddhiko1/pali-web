import { graphql } from 'src/gql';

graphql(`
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
    login: auth_login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
  mutation Logout($refreshToken: String!) {
    auth_logout(refresh_token: $refreshToken)
  }
  mutation RefreshToken($refreshToken: String!) {
    refresh: auth_refresh(refresh_token: $refreshToken, mode: json) {
      access_token
      refresh_token
    }
  }
  query UserWithEmail($email: String!) {
    users(filter: { email: { _eq: $email } }) {
      id
    }
  }
  query Me {
    users_me {
      id
      first_name
      last_name
      avatar {
        location
      }
      email
      role {
        name
      }
    }
  }
`);
