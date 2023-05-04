import { graphql } from '../gql';

graphql(`
  mutation Login($email: String!, $password: String!) {
    auth_login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
  mutation RefreshToken($refreshToken: String!) {
    auth_refresh(refresh_token: $refreshToken, mode: json) {
      access_token
      refresh_token
    }
  }
`);
