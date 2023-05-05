import { graphql } from 'src/gql';

graphql(`
  mutation UsersInvite($email: String!, $role: String!, $invite_url: String) {
    users_invite(email: $email, role: $role, invite_url: $invite_url)
  }
  mutation AuthLogin($email: String!, $password: String!) {
    auth_login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
  mutation AuthLogout($refreshToken: String!) {
    auth_logout(refresh_token: $refreshToken)
  }
  mutation AuthRefresh($refreshToken: String!) {
    auth_refresh(refresh_token: $refreshToken, mode: json) {
      access_token
      refresh_token
    }
  }
  mutation AuthPasswordRequest($email: String!) {
    auth_password_request(email: $email)
  }
  mutation AuthPasswordReset($token: String!, $password: String!) {
    auth_password_reset(token: $token, password: $password)
  }
`);
