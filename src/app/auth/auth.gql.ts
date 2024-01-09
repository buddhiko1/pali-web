import { graphql } from 'src/gql';

graphql(`
  fragment AuthTokens on auth_tokens {
    refresh_token
    access_token
    expires
  }

  mutation Login($email: String!, $password: String!) {
    authTokens: auth_login(email: $email, password: $password) {
      ...AuthTokens
    }
  }

  mutation RefreshToken($tokenForRefresh: String!) {
    authTokens: auth_refresh(refresh_token: $tokenForRefresh, mode: json) {
      ...AuthTokens
    }
  }

  mutation Logout($tokenForRefresh: String!) {
    auth_logout(refresh_token: $tokenForRefresh)
  }

  mutation RequestPasswordReset($email: String!, $urlForReset: String!) {
    auth_password_request(email: $email, reset_url: $urlForReset)
  }

  mutation ResetPassword($token: String!, $password: String!) {
    auth_password_reset(token: $token, password: $password)
  }
`);
