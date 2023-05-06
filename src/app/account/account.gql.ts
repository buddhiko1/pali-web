import { graphql } from 'src/gql';

graphql(`
  mutation SignUp($email: String!, $role: String!, $urlForInit: String) {
    users_invite(email: $email, role: $role, invite_url: $urlForInit)
  }
  mutation AccountInit($token: String!, $password: String!) {
    users_invite_accept(token: $token, password: $password)
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
  mutation Refresh($refreshToken: String!) {
    refresh: auth_refresh(refresh_token: $refreshToken, mode: json) {
      access_token
      refresh_token
    }
  }
  mutation PasswordRequest($email: String!) {
    auth_password_request(email: $email)
  }
  mutation PasswordReset($token: String!, $password: String!) {
    auth_password_reset(token: $token, password: $password)
  }
  query UserWithEmail($email: String!) {
    users(filter: { email: { _eq: $email } }) {
      id
    }
  }
`);
