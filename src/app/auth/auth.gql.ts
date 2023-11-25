import { graphql } from 'src/gql';

graphql(`
  mutation RequestPasswordReset($email: String!, $urlForReset: String!) {
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
`);
